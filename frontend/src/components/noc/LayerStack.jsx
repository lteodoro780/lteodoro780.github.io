import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

// Visualização isométrica ilustrativa, não um mapa real do ambiente.
const LEVELS = [
  { label: "APLICAÇÕES", tone: "#29f3d0", count: 6 },
  { label: "SERVIÇOS", tone: "#00e9ff", count: 8 },
  { label: "INFRAESTRUTURA", tone: "#29aaff", count: 9 },
  { label: "HARDWARE", tone: "#00d5fb", count: 10 },
];

const point = (u, v, altitude, base) => [
  350 + (u - v) * 262,
  base + (u + v) * 79 - altitude,
];

const vertices = (points) => points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const linear = (a, b, t) => a + (b - a) * t;

const Block = ({ base, u, v, w, d, height, index, color }) => {
  const A = point(u, v, height, base);
  const B = point(u + w, v, height, base);
  const C = point(u + w, v + d, height, base);
  const D = point(u, v + d, height, base);
  const C0 = point(u + w, v + d, 0, base);
  const D0 = point(u, v + d, 0, base);
  const B0 = point(u + w, v, 0, base);
  return (
    <g className="v8-server-unit" strokeLinejoin="round" aria-hidden="true">
      <polygon points={vertices([B, C, C0, B0])} fill="#072b41" stroke={color} strokeOpacity=".7" strokeWidth=".9" />
      <polygon points={vertices([D, C, C0, D0])} fill="url(#v8-server-front)" stroke={color} strokeOpacity=".75" strokeWidth=".9" />
      <polygon points={vertices([A, B, C, D])} fill="url(#v8-server-top)" stroke={color} strokeOpacity=".9" strokeWidth="1" />
      {[.24,.42,.6,.78].map((t) => {
        const sx = linear(D[0], C[0], t), sy = linear(D[1], C[1], t);
        return <line key={t} x1={sx} y1={sy+4} x2={sx} y2={sy+height-5} stroke="#36ceff" strokeWidth="1.1" strokeOpacity=".42"/>;
      })}
      <line x1={D[0]} y1={D[1]+height*.65} x2={C[0]} y2={C[1]+height*.65} stroke="#05c9ff" strokeWidth="1.2" strokeOpacity=".55"/>
      <circle cx={linear(D[0], C[0], .85)} cy={linear(D[1], C[1], .85)+height*.82} r="1.8" fill={index % 3 === 0 ? "#00f7ba" : "#36dfff"}/>
      <line x1={linear(A[0], C[0],.3)} y1={linear(A[1],C[1],.3)} x2={linear(A[0],C[0],.62)} y2={linear(A[1],C[1],.62)} stroke="#00eaff" strokeWidth="1" strokeOpacity=".45"/>
    </g>
  );
};

const Level = ({ level, index }) => {
  const base = 50 + index * 115;
  const corners = [point(0,0,0,base), point(1,0,0,base), point(1,1,0,base), point(0,1,0,base)];
  const bottomFace = [corners[3],corners[2],[corners[2][0],corners[2][1]+16],[corners[3][0],corners[3][1]+16]];
  const rightFace = [corners[1],corners[2],[corners[2][0],corners[2][1]+16],[corners[1][0],corners[1][1]+16]];
  const positions = [
    [.12,.14],[.35,.15],[.6,.13],[.16,.39],[.4,.38],[.66,.39],
    [.13,.64],[.38,.65],[.63,.62],[.75,.2],
  ];
  return (
    <g className="v8-server-plate" data-layer={level.label}>
      <polygon points={vertices(rightFace)} fill="#00233d" stroke={level.tone} strokeWidth="1.8" />
      <polygon points={vertices(bottomFace)} fill="#043551" stroke={level.tone} strokeWidth="1.8" />
      <polygon points={vertices(corners)} fill="url(#v8-plate-fill)" stroke={level.tone} strokeWidth="3.5" filter="url(#v8-edge-glow)"/>
      <polygon points={vertices(corners)} fill="url(#v8-plate-fill)" stroke="#8befff" strokeWidth="1.25"/>
      {Array.from({length:10},(_,i) => {
        const t=(i+1)/11;
        const from1=point(0,t,0,base),to1=point(1,t,0,base);
        const from2=point(t,0,0,base),to2=point(t,1,0,base);
        return <g key={i} stroke="#26a6d2" strokeWidth=".85" strokeOpacity=".17">
          <line x1={from1[0]} y1={from1[1]} x2={to1[0]} y2={to1[1]} />
          <line x1={from2[0]} y1={from2[1]} x2={to2[0]} y2={to2[1]} />
        </g>;
      })}
      {positions.slice(0,level.count).map(([u,v],i) =>
        <Block key={i} base={base} u={u} v={v} w={.16} d={.17}
          height={index === 3 ? 34 + (i%3)*7 : 24+(i%4)*8}
          index={i} color={level.tone} />
      )}
      <text x="340" y={base+178} textAnchor="middle" fill="#b5f9ff" fontSize="9" fontFamily="monospace" letterSpacing="2" opacity=".9">
        L{index + 1} / {level.label}
      </text>
      {[corners[0],corners[1],corners[2],corners[3]].map(([x,y],i) =>
        <circle key={i} cx={x} cy={y} r="3" fill={level.tone} filter="url(#v8-edge-glow)"/>
      )}
    </g>
  );
};

export const LayerStack = () => {
  const reduced = useReducedMotion();
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const x = useSpring(dx, {stiffness:42,damping:18});
  const y = useSpring(dy, {stiffness:42,damping:18});
  const move = (event) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    dx.set(((event.clientX - rect.left) / rect.width - .5) * 18);
    dy.set(((event.clientY - rect.top) / rect.height - .5) * 12);
  };

  return (
    <div data-testid="hero-layer-stack" className="v8-topology-scene relative grid h-full w-full place-items-center"
      onPointerMove={move} onPointerLeave={() => {dx.set(0);dy.set(0);}}
      role="img" aria-label="Maquete ilustrativa de datacenter em quatro níveis: aplicações, serviços, infraestrutura e hardware">
      <div className="v8-hologram-halo" aria-hidden="true"/>
      <motion.svg className="v8-topology-svg" viewBox="0 0 700 675" role="presentation"
        preserveAspectRatio="xMidYMid meet" style={{x:reduced?0:x,y:reduced?0:y}}>
        <defs>
          <linearGradient id="v8-plate-fill" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#002536" stopOpacity=".93"/>
            <stop offset=".55" stopColor="#052138" stopOpacity=".9"/>
            <stop offset="1" stopColor="#001121" stopOpacity=".96"/>
          </linearGradient>
          <linearGradient id="v8-server-top" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#0b4c69"/><stop offset="1" stopColor="#061627"/>
          </linearGradient>
          <linearGradient id="v8-server-front" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#082c47"/><stop offset="1" stopColor="#020c19"/>
          </linearGradient>
          <filter id="v8-edge-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <ellipse cx="350" cy="575" rx="245" ry="65" fill="#00bbef" opacity=".075" filter="url(#v8-edge-glow)" />
        {LEVELS.slice().reverse().map((level,i) => <Level key={level.label} level={level} index={LEVELS.length - 1 - i} />)}
      </motion.svg>
    </div>
  );
};

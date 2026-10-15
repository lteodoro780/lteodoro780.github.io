import React from "react";

// Maquete vetorial decorativa de infraestrutura.
// Camadas e gabinetes são ilustrativos; não representam a quantidade real de ativos.
const TIERS = [
  { label: "SERVICES", count: 6, accent: "#31f7ec" },
  { label: "NETWORK", count: 8, accent: "#13cfff" },
  { label: "VIRTUALIZATION", count: 10, accent: "#1fd8ff" },
  { label: "STORAGE", count: 10, accent: "#49ebff" },
  { label: "HARDWARE", count: 12, accent: "#1ce6bd" },
];

const points = (cx, cy, rx, ry) =>
  `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;

const Cube = ({ x, y, seed }) => (
  <g transform={`translate(${x} ${y})`} className="v8-svg-cube">
    <polygon points="-19,-11 0,-22 19,-11 0,0" fill="url(#v8-top-metal)" stroke="#2bdff5" strokeOpacity=".85" strokeWidth=".8" />
    <polygon points="-19,-11 0,0 0,27 -19,16" fill="url(#v8-front-metal)" stroke="#44e6ff" strokeOpacity=".65" strokeWidth=".8" />
    <polygon points="0,0 19,-11 19,16 0,27" fill="url(#v8-side-metal)" stroke="#30c8f3" strokeOpacity=".65" strokeWidth=".8" />
    {[7,13,19].map((n) => (
      <g key={n}>
        <path d={`M -15 ${n - 8} L -4 ${n - 2}`} stroke="#64efff" strokeOpacity=".43" strokeWidth=".8" />
        <circle cx={seed % 2 === 0 ? -6 : -12} cy={n - 4} r="1.35" fill="#2dfce0" />
      </g>
    ))}
    <path d="M 6,3 15,-2 M 6,8 15,3 M 6,13 15,8" stroke="#0ae2ff" strokeOpacity=".65" strokeWidth="1" />
  </g>
);

const Tier = ({ level, tier }) => {
  const cy = 180 + level * 75;
  const centers = [
    [-1.45,-.65],[-.5,-.65],[.5,-.65],[1.45,-.65],
    [-1.45,.35],[-.5,.35],[.5,.35],[1.45,.35],
    [-1,.95],[0,.95],[1,.95],[1.9,.2],
  ];
  return (
    <g className="v8-svg-tier" style={{ animationDelay: `${level * -.37}s` }}>
      <polygon points={points(350, cy + 13, 212, 73)} fill="#001221" fillOpacity=".9" stroke="#0ac7ee" strokeOpacity=".57" strokeWidth="2" />
      <polygon points={`138,${cy} 350,${cy + 73} 350,${cy + 93} 138,${cy + 20}`} fill="url(#v8-edge-left)" stroke="#0ae5fb" strokeOpacity=".66" strokeWidth="1.4" />
      <polygon points={`350,${cy + 73} 562,${cy} 562,${cy + 20} 350,${cy + 93}`} fill="url(#v8-edge-right)" stroke="#0ae5fb" strokeOpacity=".66" strokeWidth="1.4" />
      <polygon points={points(350, cy, 212, 73)} fill="url(#v8-panel-top)" stroke={tier.accent} strokeWidth="1.8" strokeOpacity=".88" />
      <polygon points={points(350, cy, 212, 73)} fill="url(#v8-grid)" opacity=".54" />
      <g filter="url(#v8-soft-neon)" opacity=".72">
        <polyline points={`138,${cy} 350,${cy+73} 562,${cy}`} fill="none" stroke={tier.accent} strokeWidth="2.7" />
      </g>
      <g>
        {centers.slice(0, tier.count).map(([u,v],idx) => (
          <Cube key={idx} x={350 + (u - v) * 62} y={cy - 20 + (u + v) * 22} seed={idx+level} />
        ))}
      </g>
      <text x="154" y={cy+3} fill="#63e7f5" fontSize="9" fontFamily="monospace" letterSpacing="2" opacity=".88">L{level} / {tier.label}</text>
      <circle cx="350" cy={cy + 74} r="3.3" fill={tier.accent} filter="url(#v8-soft-neon)" />
      <circle cx="562" cy={cy} r="2.4" fill="#55f7ff" />
    </g>
  );
};

export const NeonStack = () => (
  <div data-testid="v8-neon-stack" aria-hidden="true" className="v8-neon-stack">
    <svg viewBox="0 0 700 665" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="v8-panel-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#052f40" stopOpacity=".94" />
          <stop offset=".55" stopColor="#001421" stopOpacity=".97" />
          <stop offset="1" stopColor="#072c3f" stopOpacity=".94" />
        </linearGradient>
        <linearGradient id="v8-edge-left" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#0deafe" stopOpacity=".48"/><stop offset="1" stopColor="#011421"/></linearGradient>
        <linearGradient id="v8-edge-right" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#003146"/><stop offset="1" stopColor="#04aacf" stopOpacity=".4"/></linearGradient>
        <linearGradient id="v8-top-metal" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#226b82"/><stop offset="1" stopColor="#021d2e"/></linearGradient>
        <linearGradient id="v8-front-metal" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#0a3448"/><stop offset="1" stopColor="#020b18"/></linearGradient>
        <linearGradient id="v8-side-metal" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#0d4a63"/><stop offset="1" stopColor="#001523"/></linearGradient>
        <pattern id="v8-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M 26 0 L 0 0 0 26" fill="none" stroke="#3be8fa" strokeOpacity=".29" strokeWidth=".75"/>
        </pattern>
        <filter id="v8-soft-neon" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4.3" /></filter>
        <radialGradient id="v8-halo"><stop stopColor="#04dcf1" stopOpacity=".24"/><stop offset="1" stopColor="#01b4df" stopOpacity="0"/></radialGradient>
      </defs>
      <ellipse cx="350" cy="575" rx="297" ry="81" fill="url(#v8-halo)" />
      <path d="M350 95V618 M140 250 L70 275 M560 260 L624 239 M138 505 L60 541 M560 505 L630 520" stroke="#09bcd5" strokeOpacity=".35" strokeWidth="1" strokeDasharray="3 7" />
      {TIERS.map((tier,level)=>({tier,level})).reverse().map(({tier,level}) => <Tier key={tier.label} level={level} tier={tier} />)}
      <path d="M350 104V555" stroke="#39e5ff" strokeWidth="1" opacity=".3" strokeDasharray="1 11" />
    </svg>
  </div>
);

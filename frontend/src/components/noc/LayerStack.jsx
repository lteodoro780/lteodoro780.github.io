import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { EASE } from "./Primitives";

// Uma maquete ilustrativa em CSS 3D: NÃO representa uma topologia real.
// A interação existente por movimento do cursor é mantida.
const LAYERS = [
  { label: "hardware", tone: "#08BCE9", count: 10 },
  { label: "infraestrutura", tone: "#00E5FF", count: 9 },
  { label: "serviços", tone: "#22D3EE", count: 8 },
  { label: "aplicações", tone: "#25F0C7", count: 6 },
];

const Module = ({ layer, index }) => (
  <div
    key={index}
    aria-hidden="true"
    className={`v8-server-unit v8-server-unit-${index % 3}`}
    style={{ "--v8-glow": layer.tone }}
  >
    <span className="v8-server-grille" />
    <span className="v8-server-led" />
  </div>
);

const Plate = ({ layer, index, reduceMotion }) => (
  <motion.div
    className="layer-plate v8-server-plate absolute inset-0 border"
    style={{ borderColor: layer.tone, transformStyle: "preserve-3d", "--v8-glow": layer.tone }}
    initial={reduceMotion ? false : { z: 0, opacity: 0 }}
    animate={reduceMotion ? { z: index * 67, opacity: 1 } : { z: [index * 67, index * 67 + 7, index * 67], opacity: 1 }}
    transition={{
      opacity: { duration: 1, delay: 0.3 + index * 0.1 },
      z: { duration: 6 + index * 0.6, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" },
    }}
  >
    <div className="v8-plate-floor layer-grid absolute inset-0" />
    <div className="v8-server-grid">
      {Array.from({ length: layer.count }, (_, i) => <Module key={i} layer={layer} index={i} />)}
    </div>
    <div className="v8-plate-corners" />
    <span className="v8-layer-name">L{index + 1} / {layer.label}</span>
  </motion.div>
);

export const LayerStack = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const rz = useSpring(useTransform(mx, [-0.5, 0.5], [-28, -44]), { stiffness: 60, damping: 17 });
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [63, 51]), { stiffness: 60, damping: 17 });
  const move = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div
      data-testid="hero-layer-stack"
      onPointerMove={move}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="v8-topology-scene relative grid h-full w-full place-items-center"
      style={{ perspective: 1350 }}
      role="img"
      aria-label="Ilustração tridimensional de camadas de aplicações, serviços, infraestrutura e hardware"
    >
      <div className="v8-hologram-halo" aria-hidden="true" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.84 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
        className="cyber-layer-stack v8-server-stack relative h-[180px] w-[180px] sm:h-[230px] sm:w-[230px]"
        style={{ rotateX: reduceMotion ? 56 : rx, rotateZ: reduceMotion ? -37 : rz, transformStyle: "preserve-3d" }}
      >
        {LAYERS.map((layer, index) => <Plate key={layer.label} layer={layer} index={index} reduceMotion={reduceMotion} />)}
      </motion.div>
    </div>
  );
};

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { EASE } from "./Primitives";

const LAYERS = [
  { label: "obs · métricas", tone: "#334155" },
  { label: "data · storage", tone: "#334155" },
  { label: "app · cluster", tone: "#06B6D4" },
  { label: "ingress · lb", tone: "#334155" },
  { label: "edge · cdn", tone: "#10B981" },
];

const Plate = ({ l, i }) => (
  <motion.div
    className="layer-plate absolute inset-0 border"
    style={{ borderColor: l.tone, transformStyle: "preserve-3d" }}
    initial={{ z: 0, opacity: 0 }}
    animate={{ z: [i * 44, i * 44 + 8, i * 44], opacity: 1 }}
    transition={{
      opacity: { duration: 0.8, delay: 0.6 + i * 0.12 },
      z: { duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
    }}
  >
    <div className="absolute inset-0 layer-grid opacity-70" />
    <span className="absolute left-3 top-3 font-mono text-xs uppercase tracking-widest" style={{ color: l.tone === "#334155" ? "#94A3B8" : l.tone }}>
      L{i} · {l.label}
    </span>
    <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full" style={{ background: l.tone === "#334155" ? "#10B981" : l.tone }} />
  </motion.div>
);

export const LayerStack = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rz = useSpring(useTransform(mx, [-0.5, 0.5], [-30, -46]), { stiffness: 60, damping: 16 });
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [64, 50]), { stiffness: 60, damping: 16 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  return (
    <div
      data-testid="hero-layer-stack"
      onPointerMove={move}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
      className="relative grid h-full w-full place-items-center"
      style={{ perspective: 1400 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
        className="relative h-[180px] w-[180px] sm:h-[230px] sm:w-[230px]"
        style={{ rotateX: rx, rotateZ: rz, transformStyle: "preserve-3d" }}
      >
        {LAYERS.map((l, i) => (
          <Plate key={l.label} l={l} i={i} />
        ))}
      </motion.div>
    </div>
  );
};

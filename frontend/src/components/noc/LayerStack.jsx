// Aparência da topologia V3 aplicada à base funcional V7.
// Quatro camadas em perspectiva, com movimento CSS leve em vez de loops JS/Canvas.
const LAYERS = [
  { label: "obs · métricas", tone: "#64748b" },
  { label: "data · storage", tone: "#334155" },
  { label: "app · cluster", tone: "#06b6d4" },
  { label: "edge · network", tone: "#10b981" },
];

const Plate = ({ layer, index }) => (
  <div
    data-testid="topology-square"
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      "--topology-x": `${-index * 15}px`,
      "--topology-y": `${-index * 20}px`,
      "--topology-depth": `${index * 27}px`,
      "--topology-phase": `${-index * 0.38}s`,
      transformStyle: "preserve-3d",
    }}
  >
    {index === 0 && <div className="absolute inset-0 layer-grid opacity-70" />}
    <span
      className="absolute left-3 top-3 font-mono text-xs uppercase tracking-widest"
      style={{ color: layer.tone === "#334155" ? "#94a3b8" : layer.tone }}
    >
      L{index} · {layer.label}
    </span>
    <span
      className="absolute bottom-3 right-3 h-2 w-2 rounded-full"
      style={{ background: layer.tone === "#334155" ? "#10b981" : layer.tone }}
    />
  </div>
);

export const LayerStack = () => (
  <div
    data-testid="hero-layer-stack"
    className="relative grid h-full w-full place-items-center"
    style={{ perspective: 1400 }}
  >
    <div
      data-testid="animated-layer-stack"
      className="cyber-layer-stack relative h-[180px] w-[180px] sm:h-[230px] sm:w-[230px]"
    >
      {LAYERS.map((layer, index) => (
        <Plate key={layer.label} layer={layer} index={index} />
      ))}
    </div>
  </div>
);

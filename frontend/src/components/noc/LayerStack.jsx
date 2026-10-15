// Topologia decorativa V7: quatro quadrados 3D animados apenas por CSS.
// Sem requestAnimationFrame, Canvas, listeners de ponteiro ou motion values.
const LAYERS = [
  { label: "obs · métricas", tone: "#334155" },
  { label: "data · storage", tone: "#334155" },
  { label: "app · cluster", tone: "#06B6D4" },
  { label: "edge · network", tone: "#10B981" },
];

const Plate = ({ layer, index }) => (
  <div
    data-testid="topology-square"
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      // Separar as placas também em X/Y. Só o eixo Z fazia
      // os painéis opacos se sobreporem visualmente em uma única placa.
      "--topology-x": `${-index * 12}px`,
      "--topology-y": `${-index * 36}px`,
      "--topology-depth": `${index * 16}px`,
      "--topology-phase": `${-index * 0.55}s`,
      transformStyle: "preserve-3d",
    }}
  >
    {index === 0 && <div className="absolute inset-0 layer-grid opacity-70" />}
    <span
      className="absolute left-3 top-3 font-mono text-xs uppercase tracking-widest"
      style={{ color: layer.tone === "#334155" ? "#94A3B8" : layer.tone }}
    >
      L{index} · {layer.label}
    </span>
    <span
      className="absolute bottom-3 right-3 h-2 w-2 rounded-full"
      style={{ background: layer.tone === "#334155" ? "#10B981" : layer.tone }}
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

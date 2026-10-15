// V7 modo leve: mantém as cinco camadas visuais sem ciclo de renderização
// ou processamento de movimento do ponteiro.
const LAYERS = [
  { label: "obs · métricas", tone: "#334155" },
  { label: "data · storage", tone: "#334155" },
  { label: "app · cluster", tone: "#06B6D4" },
  { label: "ingress · lb", tone: "#334155" },
  { label: "edge · cdn", tone: "#10B981" },
];

const Plate = ({ layer, index }) => (
  <div
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      transform: `translateZ(${index * 44}px)`,
      transformStyle: "preserve-3d",
    }}
  >
    <div className="absolute inset-0 layer-grid opacity-70" />
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
  <div data-testid="hero-layer-stack" className="relative grid h-full w-full place-items-center" style={{ perspective: 1400 }}>
    <div
      data-testid="static-layer-stack"
      className="cyber-layer-stack relative h-[180px] w-[180px] sm:h-[230px] sm:w-[230px]"
      style={{ transform: "rotateX(56deg) rotateZ(-38deg)", transformStyle: "preserve-3d" }}
    >
      {LAYERS.map((layer, index) => (
        <Plate key={layer.label} layer={layer} index={index} />
      ))}
    </div>
  </div>
);

// Componente derivado da V3 histórica: d7366f9a74888151ad46485b58d1d8347266a992.
// Apenas quatro placas e profundidade maior; sem tilt por mouse ou animação JS.
const LAYERS = [
  { label: "suporte · redes", tone: "#334155" },
  { label: "windows server · ad", tone: "#334155" },
  { label: "linux · monitoramento", tone: "#06B6D4" },
  { label: "automação · ia local", tone: "#10B981" },
];

const Plate = ({ layer, index }) => (
  <div
    data-testid="topology-plate"
    data-layer-index={index}
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      "--layer-depth": `${index * 68}px`,
      "--layer-phase": `${-index * 0.4}s`,
      transformStyle: "preserve-3d",
    }}
  >
    <div className="absolute inset-0 layer-grid opacity-70" aria-hidden="true" />
    <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-widest sm:text-xs"
      style={{ color: layer.tone === "#334155" ? "#94A3B8" : layer.tone }}>
      L{index} · {layer.label}
    </span>
    <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full"
      style={{ background: layer.tone === "#334155" ? "#10B981" : layer.tone }} aria-hidden="true" />
  </div>
);

export const LayerStack = () => (
  <div data-testid="hero-layer-stack" className="relative grid h-full w-full place-items-center" style={{ perspective: 1400 }}>
    <div data-testid="animated-layer-stack" className="v3-layer-stack relative">
      {LAYERS.map((layer, index) => <Plate key={layer.label} layer={layer} index={index} />)}
    </div>
  </div>
);

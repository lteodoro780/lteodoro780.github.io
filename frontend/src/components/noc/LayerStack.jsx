import { useEffect, useRef, useState } from "react";
import { APP } from "../os/appMeta";
import { useDesktop } from "../../lib/desktop";

// Componente derivado da V3 histórica: d7366f9a74888151ad46485b58d1d8347266a992.
// Quatro placas; cada uma representa uma área de atuação documentada no conteúdo.
// Os rótulos ficam numa camada plana por cima das placas (conteúdo dentro do
// contexto 3D quebra a composição no Chromium) e seguem o canto esquerdo de cada
// placa, medido por um marcador vazio, a cada quadro.
export const LAYER_STATUS = {
  operational: { label: "documentado", dot: "bg-noc-ok", color: "#10B981" },
  degraded: { label: "em desenvolvimento", dot: "bg-noc-warn", color: "#F59E0B" },
};

export const LAYERS = [
  { label: "suporte · redes", tone: "#334155", app: "carreira", status: "operational", evidence: "Incidentes de conectividade, autenticação, estações e servidores." },
  { label: "windows server · ad", tone: "#334155", app: "metricas", status: "operational", evidence: "Active Directory, GPO, autenticação e serviços de rede." },
  { label: "linux · monitoramento", tone: "#06B6D4", app: "tecnicos", status: "operational", evidence: "Debian e Ubuntu, systemd, troubleshooting e Zabbix." },
  { label: "automação · ia local", tone: "#10B981", app: "servicos", status: "degraded", evidence: "PowerShell, Bash e Python; IA local no SENTINELA, em desenvolvimento." },
];

const Plate = ({ layer, index, active, cornerRef }) => (
  <div
    data-testid="topology-plate"
    data-layer-index={index}
    data-active={active ? "true" : undefined}
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      "--layer-depth": `${index * 68}px`,
      "--layer-phase": `${-index * 0.4}s`,
      transformStyle: "preserve-3d",
    }}
  >
    <div className="absolute inset-0 layer-grid opacity-70" aria-hidden="true" />
    <span className="layer-dot absolute bottom-3 right-3 h-2 w-2 rounded-full" style={{ background: LAYER_STATUS[layer.status].color }} aria-hidden="true" />
    <i ref={cornerRef} className="layer-corner" aria-hidden="true" />
  </div>
);

const Tag = ({ layer, index, active, onActive, onOpen, posRef }) => {
  const st = LAYER_STATUS[layer.status];
  const target = APP[layer.app]?.label ?? layer.app;
  return (
    <div ref={posRef} className="layer-tag-pos">
      <button
        type="button"
        data-testid={`layer-label-${index}`}
        data-active={active ? "true" : undefined}
        className="layer-tag"
        aria-label={`L${index} · ${layer.label}, ${st.label}. ${layer.evidence} Abrir ${target}.`}
        onClick={() => onOpen(layer.app)}
        onMouseEnter={() => onActive(index)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(index)}
        onBlur={() => onActive(null)}
      >
        <span className="layer-tag-head" aria-hidden="true">
          <span className="layer-tag-status" style={{ background: st.color }} />
          L{index} · {layer.label}
        </span>
        <span className="layer-tag-detail" aria-hidden="true">
          <span className="layer-tag-state" style={{ color: st.color }}>{st.label}</span>
          {layer.evidence}
          <span className="layer-tag-open">abrir {target.toLowerCase()} ↗</span>
        </span>
      </button>
    </div>
  );
};

export const LayerStack = () => {
  const { open } = useDesktop();
  const [active, setActive] = useState(null);
  const rootRef = useRef(null);
  const corners = useRef([]);
  const tags = useRef([]);

  useEffect(() => {
    let frame;
    const tick = () => {
      const root = rootRef.current;
      if (root && root.offsetParent !== null) {
        const base = root.getBoundingClientRect();
        // lê todas as posições antes de escrever, para não forçar layout a cada placa
        const points = corners.current.map((c) => (c ? c.getBoundingClientRect() : null));
        points.forEach((p, i) => {
          const t = tags.current[i];
          if (p && t) t.style.transform = `translate(${(p.left - base.left).toFixed(1)}px, ${(p.top - base.top).toFixed(1)}px)`;
        });
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={rootRef} data-testid="hero-layer-stack" className="relative grid h-full w-full place-items-center" style={{ perspective: 1400 }}>
      <div data-testid="animated-layer-stack" className="v3-layer-stack relative" aria-hidden="true">
        {LAYERS.map((layer, index) => (
          <Plate key={layer.label} layer={layer} index={index} active={active === index} cornerRef={(el) => { corners.current[index] = el; }} />
        ))}
      </div>
      <nav className="layer-tags" aria-label="Áreas de atuação">
        {LAYERS.map((layer, index) => (
          <Tag key={layer.label} layer={layer} index={index} active={active === index} onActive={setActive} onOpen={open} posRef={(el) => { tags.current[index] = el; }} />
        ))}
      </nav>
    </div>
  );
};

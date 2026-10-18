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

// Ao focar uma camada, as de cima sobem e ela se destaca: a pilha "abre" ali.
const liftFor = (index, active) => {
  if (active === null) return 0;
  if (index > active) return 34;
  return index === active ? 12 : 0;
};

const Plate = ({ layer, index, active, lift, cornerRef }) => (
  <div
    data-testid="topology-plate"
    data-layer-index={index}
    data-active={active ? "true" : undefined}
    className="layer-plate absolute inset-0 border"
    style={{
      borderColor: layer.tone,
      "--layer-depth": `${index * 68}px`,
      "--layer-phase": `${-index * 0.4}s`,
      "--layer-lift": `${lift}px`,
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

const PACKETS = 3;          // pacotes circulando ao mesmo tempo
const PACKET_PERIOD = 4200; // ms para um pacote ir de L0 a L3
const TILT_X = 7;           // graus, mouse em cima/embaixo
const TILT_Z = 12;          // graus, mouse à esquerda/direita
const TILT_IDLE_MS = 2600;  // sem mexer o mouse, a pilha volta ao lugar

const media = (q) => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(q) : { matches: false });

export const LayerStack = () => {
  const { open } = useDesktop();
  const [active, setActive] = useState(null);
  const rootRef = useRef(null);
  const stackRef = useRef(null);
  const corners = useRef([]);
  const tags = useRef([]);
  const spineRef = useRef(null);
  const nodes = useRef([]);
  const packets = useRef([]);

  // Inclinação seguindo o mouse (só com mouse de verdade e sem "reduzir movimento").
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || media("(prefers-reduced-motion: reduce)").matches || !media("(hover: hover) and (pointer: fine)").matches) return undefined;
    let idle;
    let pending = null;
    let frame = 0;
    const apply = () => {
      frame = 0;
      if (!pending) return;
      stack.style.setProperty("--tilt-x", `${pending.x.toFixed(2)}deg`);
      stack.style.setProperty("--tilt-z", `${pending.z.toFixed(2)}deg`);
    };
    const reset = () => { pending = { x: 0, z: 0 }; if (!frame) frame = requestAnimationFrame(apply); };
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pending = { x: -ny * 2 * TILT_X, z: nx * 2 * TILT_Z };
      if (!frame) frame = requestAnimationFrame(apply);
      clearTimeout(idle);
      idle = setTimeout(reset, TILT_IDLE_MS);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      clearTimeout(idle);
      cancelAnimationFrame(frame);
    };
  }, []);

  // A cada quadro: posição dos rótulos, linha entre os cantos e pacotes subindo.
  useEffect(() => {
    let frame;
    const start = performance.now();
    const reduce = media("(prefers-reduced-motion: reduce)");
    const tick = (now) => {
      const root = rootRef.current;
      if (root && root.offsetParent !== null) {
        const base = root.getBoundingClientRect();
        // lê todas as posições antes de escrever, para não forçar layout a cada placa
        const pts = corners.current.map((c) => {
          if (!c) return null;
          const r = c.getBoundingClientRect();
          return { x: r.left - base.left, y: r.top - base.top };
        });
        pts.forEach((p, i) => {
          const t = tags.current[i];
          if (p && t) t.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px)`;
          const n = nodes.current[i];
          if (p && n) { n.setAttribute("cx", p.x.toFixed(1)); n.setAttribute("cy", p.y.toFixed(1)); }
        });
        if (pts.every(Boolean)) {
          if (spineRef.current) spineRef.current.setAttribute("points", pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
          // comprimento acumulado da linha L0 → L3
          const seg = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
          const total = seg.reduce((a, b) => a + b, 0);
          const hits = [false, false, false, false];
          packets.current.forEach((dot, k) => {
            if (!dot) return;
            if (reduce.matches || total < 1) { dot.setAttribute("r", "0"); return; }
            const u = (((now - start) / PACKET_PERIOD) + k / PACKETS) % 1;
            let d = u * total;
            let i = 0;
            while (i < seg.length - 1 && d > seg[i]) { d -= seg[i]; i += 1; }
            const f = seg[i] ? Math.min(d / seg[i], 1) : 0;
            const x = pts[i].x + (pts[i + 1].x - pts[i].x) * f;
            const y = pts[i].y + (pts[i + 1].y - pts[i].y) * f;
            dot.setAttribute("cx", x.toFixed(1));
            dot.setAttribute("cy", y.toFixed(1));
            // some suavemente no começo e no fim do trajeto
            dot.setAttribute("r", (2.6 * Math.min(1, u * 8, (1 - u) * 8)).toFixed(2));
            // acende o nó da camada por onde o pacote está passando
            pts.forEach((p, j) => { if (Math.hypot(p.x - x, p.y - y) < 7) hits[j] = true; });
          });
          nodes.current.forEach((n, j) => { if (n) n.setAttribute("data-hit", hits[j] ? "true" : "false"); });
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={rootRef} data-testid="hero-layer-stack" className="relative grid h-full w-full place-items-center" style={{ perspective: 1400 }}>
      <div ref={stackRef} data-testid="animated-layer-stack" className="v3-layer-stack relative" aria-hidden="true">
        {LAYERS.map((layer, index) => (
          <Plate key={layer.label} layer={layer} index={index} active={active === index} lift={liftFor(index, active)} cornerRef={(el) => { corners.current[index] = el; }} />
        ))}
      </div>
      <svg className="layer-flow" aria-hidden="true" focusable="false">
        <polyline ref={spineRef} className="layer-spine" points="" />
        {LAYERS.map((layer, index) => (
          <circle key={layer.label} ref={(el) => { nodes.current[index] = el; }} className="layer-node" r="3.5" cx="0" cy="0" />
        ))}
        {Array.from({ length: PACKETS }, (_, k) => (
          <circle key={k} ref={(el) => { packets.current[k] = el; }} className="layer-packet" r="0" cx="0" cy="0" />
        ))}
      </svg>
      <nav className="layer-tags" aria-label="Áreas de atuação">
        {LAYERS.map((layer, index) => (
          <Tag key={layer.label} layer={layer} index={index} active={active === index} onActive={setActive} onOpen={open} posRef={(el) => { tags.current[index] = el; }} />
        ))}
      </nav>
    </div>
  );
};

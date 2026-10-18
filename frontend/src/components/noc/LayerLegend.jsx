import { Dot } from "./Primitives";
import { LAYERS, LAYER_STATUS } from "./LayerStack";
import { useDesktop } from "../../lib/desktop";

// Legenda legível e acessível das placas: mouse e foco destacam a placa,
// o clique abre a janela da área. Visível só em telas largas (ver App.css).
export const LayerLegend = ({ onActive }) => {
  const { open } = useDesktop();
  return (
    <nav data-testid="layer-legend" aria-label="Áreas de atuação" className="layer-legend">
      {LAYERS.map((layer, i) => {
        const st = LAYER_STATUS[layer.status];
        return (
          <button
            key={layer.label}
            type="button"
            data-testid={`layer-legend-${i}`}
            onClick={() => open(layer.app)}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
            onFocus={() => onActive(i)}
            onBlur={() => onActive(null)}
            className="border border-noc-line bg-noc-bg/85 p-3 text-left outline-none transition-colors hover:border-noc-ok focus-visible:border-noc-ok focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-400">
              <span>L{i} · {layer.label}</span>
              <span className="flex items-center gap-1.5 normal-case tracking-normal text-slate-300"><Dot color={st.dot} />{st.label}</span>
            </span>
            <span className="mt-1.5 block font-mono text-xs leading-snug text-slate-300">{layer.evidence}</span>
          </button>
        );
      })}
    </nav>
  );
};

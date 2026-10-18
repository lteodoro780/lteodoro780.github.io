import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { MARQUEE, PROFILE } from "../../content";
import { Dot } from "../noc/Primitives";

// Conteúdo profissional atualizado da V7 com o movimento discreto da barra V3.
const ITEMS = [PROFILE.role, ...MARQUEE];

const Track = ({ hidden = false }) => (
  <div aria-hidden={hidden} className="flex shrink-0 items-center">
    {ITEMS.map((t) => (
      <span key={t} className="flex items-center gap-8 pr-10 font-mono text-xs uppercase tracking-[0.25em] text-slate-300 whitespace-nowrap">
        {t}
        <span className="h-1.5 w-1.5 rotate-45 bg-noc-ok" />
      </span>
    ))}
  </div>
);

// A faixa já pausa com mouse e foco; o botão cobre toque e teclado (WCAG 2.2.2).
export const Ticker = () => {
  const [paused, setPaused] = useState(false);
  const Icon = paused ? Play : Pause;
  return (
    <div data-testid="top-ticker" className="cyber-ticker fixed inset-x-0 top-0 z-50 flex h-8 items-center overflow-hidden border-b border-noc-line bg-noc-bg/95">
      <div className="z-10 flex h-full shrink-0 items-center gap-2 border-r border-noc-line bg-noc-bg px-3 font-mono text-xs text-emerald-400">
        <Dot ping={false} /> PORTFÓLIO
      </div>
      <div data-testid="ticker-v3-track" className="marquee" style={paused ? { animationPlayState: "paused" } : undefined}>
        <Track />
        <Track hidden />
      </div>
      <button
        type="button"
        data-testid="ticker-toggle"
        aria-pressed={paused}
        aria-label={paused ? "Retomar a faixa de texto em movimento" : "Pausar a faixa de texto em movimento"}
        title={paused ? "Retomar" : "Pausar"}
        onClick={() => setPaused((p) => !p)}
        className="absolute right-0 top-0 z-10 grid h-full w-10 place-items-center border-l border-noc-line bg-noc-bg text-slate-300 outline-none hover:text-emerald-400 focus-visible:text-emerald-400 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400"
      >
        <Icon size={14} strokeWidth={1.8} />
      </button>
    </div>
  );
};

import { MARQUEE, PROFILE } from "../../content";
import { Dot } from "../noc/Primitives";

// Conteúdo profissional atualizado da V7 com o movimento discreto da barra V3.
const ITEMS = [PROFILE.role, ...MARQUEE];

const Track = ({ hidden = false }) => (
  <div aria-hidden={hidden} className="flex shrink-0 items-center">
    {ITEMS.map((t) => (
      <span key={t} className="flex items-center gap-6 pr-6 font-mono text-xs uppercase tracking-[0.25em] text-slate-300">
        {t}
        <span className="h-1.5 w-1.5 rotate-45 bg-noc-ok" />
      </span>
    ))}
  </div>
);

export const Ticker = () => (
  <div data-testid="top-ticker" className="cyber-ticker fixed inset-x-0 top-0 z-50 flex h-8 items-center overflow-hidden border-b border-noc-line bg-noc-bg/95">
    <div className="z-10 flex h-full shrink-0 items-center gap-2 border-r border-noc-line bg-noc-bg px-3 font-mono text-xs text-emerald-400">
      <Dot ping={false} /> PORTFÓLIO
    </div>
    <div data-testid="ticker-v3-track" className="marquee">
      <Track />
      <Track hidden />
    </div>
  </div>
);

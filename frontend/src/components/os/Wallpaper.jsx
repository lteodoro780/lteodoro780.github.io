import { motion } from "framer-motion";
import { LayerStack } from "../noc/LayerStack";
import { EASE } from "../noc/Primitives";
import { PROFILE } from "../../content";
import { useDesktop } from "../../lib/desktop";

const Line = ({ ready, delay, children }) => (
  <span className="block overflow-hidden pb-[0.02em]">
    <motion.span className="block" initial={{ y: "108%" }} animate={ready ? { y: 0 } : { y: "108%" }} transition={{ duration: 1.2, ease: EASE, delay }}>{children}</motion.span>
  </span>
);

export const Wallpaper = ({ ready }) => {
  const { open } = useDesktop();
  return <div data-testid="wallpaper" className="fixed inset-x-0 bottom-12 top-8 overflow-hidden">
    <div className="noc-grid absolute inset-0 opacity-60" />
    <div className="cyber-ambient-glow pointer-events-none absolute inset-0" aria-hidden="true" />
    <img src={`${process.env.PUBLIC_URL}/img/rack.jpg`} alt="" aria-hidden="true" className="wallpaper-photo absolute right-0 top-0 h-full w-full object-cover opacity-25 grayscale contrast-125 md:w-[60%]" />
    <div className="absolute inset-0 bg-noc-ok/5 mix-blend-color" />
    <div className="cyber-scan-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
    <div data-testid="v7-background-hud" className="cyber-hud-caption pointer-events-none absolute hidden select-none xl:block" aria-hidden="true">
      <span className="cyber-hud-rule" />
      <span className="block">L0 / LOCAL INTERFACE</span>
      <span className="mt-1 block text-emerald-500/60">TOPOLOGY · SYSTEMS</span>
      <span className="mt-3 block text-[10px] opacity-70">[+] NETWORK / AUTOMATION</span>
    </div>
    <div className="cyber-hud-coordinate pointer-events-none absolute hidden select-none lg:block" aria-hidden="true">
      <span className="text-emerald-400/70">⊞</span> L0 / 07 · FRONTEND / REACT
    </div>
    <div className="topology-central-host"><LayerStack /></div>
    <div className="wallpaper-intro absolute bottom-5 left-4 right-4 hidden md:block md:bottom-8 md:left-8">
      <h1 data-testid="wallpaper-name" className="font-display text-[9rem] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-slate-50 xl:text-[12rem]">
        <Line ready={ready} delay={0.1}>{PROFILE.first}</Line>
        <Line ready={ready} delay={0.25}><span className="text-outline">{PROFILE.last}</span><span className="text-noc-ok">.</span></Line>
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-300"><span className="text-emerald-400">&gt;</span> {PROFILE.role} · clique nos ícones para explorar</motion.p>
    </div>
    <motion.section
      data-testid="mobile-intro"
      aria-label="Apresentação profissional"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 15 }}
      transition={{ duration: 0.6, delay: 0.18 }}
      className="mobile-recruiter-intro md:hidden"
    >
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.13em] text-emerald-400">
        <span>Portfólio profissional</span><span className="text-slate-400">desde 2021</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <img src={`${process.env.PUBLIC_URL}/img/luis-florencio.webp`} alt="Luis O. Florencio" className="h-[72px] w-[66px] shrink-0 border border-noc-line2 bg-noc-panel object-cover object-top" />
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(32px,10vw,44px)] font-extrabold uppercase leading-[0.93] tracking-tight text-slate-50">Luis O.<br/><span className="text-emerald-400">Florencio.</span></h1>
          <p className="mt-2 font-mono text-[11px] leading-snug text-emerald-300">{PROFILE.role}</p>
        </div>
      </div>
      <p className="mt-4 font-mono text-[12px] leading-relaxed text-slate-200">
        Formado em ADS. Atuação em Linux, Windows Server, redes, AD/GPO e automação com Python, Bash e PowerShell.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button data-testid="mobile-cta-projects" type="button" onClick={() => open("servicos")} className="min-h-10 bg-noc-ok px-3 py-2 font-mono text-[11px] font-bold uppercase text-noc-bg hover:bg-emerald-300">
          Explorar projetos ↗
        </button>
        <button data-testid="mobile-cta-about" type="button" onClick={() => open("sobre")} className="min-h-10 border border-noc-line2 px-3 py-2 font-mono text-[11px] uppercase text-slate-100 hover:border-noc-ok">
          Sobre mim
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-noc-line pt-3 font-mono text-xs">
        <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white">LinkedIn ↗</a>
        <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:text-white">GitHub ↗</a>
        <span className="text-slate-400">Três Corações, MG</span>
      </div>
    </motion.section>
  </div>;
};

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Terminal } from "lucide-react";
import { Dot, EASE } from "../../noc/Primitives";
import { PROFILE } from "../../../content";
import { useDesktop } from "../../../lib/desktop";

const Line = ({ delay, children }) => <span className="block overflow-hidden pb-[0.02em]"><motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay }}>{children}</motion.span></span>;

const Evidence = ({ label, value, detail }) => (
  <div className="min-w-0 border border-noc-line bg-noc-panel/60 p-3">
    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">{label}</div>
    <div className="mt-2 font-display text-2xl font-bold uppercase text-slate-50">{value}</div>
    <div className="mt-1 font-mono text-xs text-slate-300">{detail}</div>
  </div>
);

export const SobreApp = () => {
  const { open } = useDesktop();
  return <div data-testid="app-sobre">
    <div className="flex items-start gap-4">
      <div data-testid="about-photo" className="about-photo-card"><img src={`${process.env.PUBLIC_URL}/img/luis-florencio.webp`} alt="Foto de Luis O. Florencio" loading="eager" /></div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400">
          <span className="flex items-center gap-2 text-emerald-400"><Dot /> perfil profissional</span>
          <span>{PROFILE.location}</span>
        </div>
        <h2 data-testid="hero-name" className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-slate-50 sm:text-6xl">
          <Line delay={0.1}>{PROFILE.first}</Line><Line delay={0.2}><span className="text-outline">{PROFILE.last}</span><span className="text-noc-ok">.</span></Line>
        </h2>
        <p data-testid="hero-role" className="mt-3 font-mono text-sm uppercase tracking-[0.12em] text-emerald-400">&gt; {PROFILE.role}</p>
      </div>
    </div>
    <p className="mt-5 font-mono text-sm leading-relaxed text-slate-300">{PROFILE.bio}</p>
    <div className="mt-5 flex flex-wrap gap-2">
      <a data-testid="hero-cta-resume" href={`${process.env.PUBLIC_URL}/curriculo.html`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-noc-ok px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-noc-bg hover:bg-emerald-400"><FileText size={14}/> Currículo <ArrowUpRight size={14}/></a>
      <button data-testid="hero-cta-services" onClick={() => open("servicos")} className="group inline-flex items-center gap-2 border border-noc-line2 px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-200 hover:border-noc-ok hover:text-emerald-400">Ver estudos de caso <ArrowUpRight size={14}/></button>
      <button data-testid="hero-cta-ticket" onClick={() => open("ticket")} className="inline-flex items-center gap-2 border border-noc-line2 px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-200 hover:border-noc-ok hover:text-emerald-400"><Terminal size={14}/> Contato direto</button>
    </div>
    <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs">
      <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">LinkedIn ↗</a>
      <a href={`https://${PROFILE.github}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">GitHub ↗</a>
    </div>
    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
      <Evidence label="Experiência" value="Desde 2021" detail="Infraestrutura e suporte" />
      <Evidence label="Formação" value="ADS" detail="Concluída em 2026" />
      <Evidence label="Destaque" value="300+" detail="Estações migradas para Kubuntu + AD, com liderança" />
    </div>
  </div>;
};

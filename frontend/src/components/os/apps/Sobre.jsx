import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { Dot, EASE } from "../../noc/Primitives";
import { PROFILE } from "../../../content";
import { useDesktop } from "../../../lib/desktop";
import { useIncident } from "../../../lib/incident";
import { useClock, useJitter } from "../../../lib/live";

const Line = ({ delay, children }) => <span className="block overflow-hidden pb-[0.02em]"><motion.span className="block" initial={{ y: "108%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: EASE, delay }}>{children}</motion.span></span>;
const Stat = ({ label, value, testid, accent }) => <div data-testid={testid} className="border border-noc-line bg-noc-panel/60 p-3"><div className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">{label}</div><div className={`mt-1 font-display text-3xl font-bold tabular-nums ${accent || "text-slate-50"}`}>{value}</div></div>;
export const SobreApp = () => {
  const { open } = useDesktop();
  const { active } = useIncident();
  const clock = useClock();
  const p50 = useJitter(12, 2, 1300);
  return <div data-testid="app-sobre">
    <div data-testid="about-photo" className="about-photo-banner"><img src={`${process.env.PUBLIC_URL}/img/luis-florencio.webp`} alt="Foto de Luis O. Florencio" loading="eager" /></div>
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.2em] text-slate-400"><span className="flex items-center gap-2 text-emerald-400"><Dot /> modo demonstração</span><span>{PROFILE.node}</span></div>
    <h2 data-testid="hero-name" className="mt-5 font-display text-6xl font-extrabold uppercase leading-[0.84] tracking-tight text-slate-50 sm:text-7xl">
      <Line delay={0.1}>{PROFILE.first}</Line><Line delay={0.2}><span className="text-outline">{PROFILE.last}</span><span className="text-noc-ok">.</span></Line>
    </h2>
    <p data-testid="hero-role" className="mt-5 font-mono text-sm uppercase tracking-[0.15em] text-emerald-400">&gt; {PROFILE.role}</p>
    <p className="mt-3 font-mono text-sm leading-relaxed text-slate-300">{PROFILE.bio}</p><p className="mt-2 font-mono text-xs text-slate-400">{PROFILE.location}</p>
    <div className="mt-6 grid grid-cols-2 gap-2">
      <Stat testid="hero-uptime-counter" label="Sessão" value={clock}/>
      <Stat testid="hero-latency" label="Latência (DEMO)" value={`${active ? p50 + 640 : p50}ms`} accent={active ? "text-red-400" : undefined}/>
      <Stat testid="hero-sla" label="Painel" value="DEMO"/>
      <Stat testid="hero-incidents" label="Incidente (DEMO)" value={active ? "1" : "0"} accent={active ? "text-red-400" : undefined}/>
    </div>
    <div className="mt-6 flex flex-wrap gap-2">
      <button data-testid="hero-cta-services" onClick={() => open("servicos")} className="group inline-flex items-center gap-2 bg-noc-ok px-4 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-noc-bg hover:bg-emerald-400">Ver projetos <ArrowUpRight size={14}/></button>
      <button data-testid="hero-cta-ticket" onClick={() => open("ticket")} className="inline-flex items-center gap-2 border border-noc-line2 px-4 py-3 font-mono text-xs uppercase tracking-wider text-slate-200 hover:border-noc-ok hover:text-emerald-400"><Terminal size={14}/> Contato direto</button>
    </div>
  </div>;
};

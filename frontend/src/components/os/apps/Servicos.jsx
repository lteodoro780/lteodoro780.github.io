import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Dot, EASE } from "../../noc/Primitives";
import { SERVICES } from "../../../content";

const STATUS = {
  operational: { label: "DOCUMENTADO", color: "bg-noc-ok", text: "text-emerald-400" },
  degraded: { label: "EM DESENVOLVIMENTO", color: "bg-noc-warn", text: "text-amber-400" },
};
const Banner = () => (
  <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mb-4">
    <motion.div variants={{ hidden: { clipPath: "inset(0 45% 0 45%)" }, show: { clipPath: "inset(0 0% 0 0%)", transition: { duration: 1.2, ease: EASE } } }} className="relative h-40 overflow-hidden border border-noc-line sm:h-48">
      <img src={`${process.env.PUBLIC_URL}/img/cables.webp`} alt="Racks de servidores com cabeamento" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-noc-bg via-noc-bg/20 to-transparent" />
      <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-end justify-between gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-200">
        <span>PORTFÓLIO // PROJETOS</span><span className="flex items-center gap-2 text-emerald-400"><Dot /> {SERVICES.length} projetos</span>
      </div>
    </motion.div>
  </motion.div>
);
const Row = ({ s }) => {
  const st = STATUS[s.status] || STATUS.degraded;
  const target = s.demo || s.repo;
  const img = `${process.env.PUBLIC_URL}/${s.cover.replace(/^\.\//, "")}`;
  return (
    <article data-testid={`project-card-${s.id}`} className="group border-t border-noc-line py-6 transition-colors duration-300 hover:bg-noc-panel/60 sm:px-3">
      <div className="flex items-center justify-between gap-2 font-mono text-xs"><span className="text-slate-400">PRJ/{s.id}</span><span data-testid={`project-status-badge-${s.id}`} className={`flex items-center gap-2 ${st.text}`}><Dot color={st.color}/>{st.label}</span></div>
      <h3 className="mt-3 font-display text-4xl font-bold uppercase text-slate-50 transition-transform duration-300 group-hover:translate-x-1">{s.name}</h3>
      <p className="mt-2 font-mono text-sm leading-relaxed text-slate-300">{s.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">{s.stack.map(t => <span key={t} className="border border-noc-line2 px-2 py-0.5 font-mono text-xs text-slate-200">{t}</span>)}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {s.repo && <a data-testid={`project-repo-${s.id}`} href={s.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 border border-noc-line2 px-3 py-2 font-mono text-xs text-slate-200 hover:border-noc-ok"><Github size={14}/> Repo</a>}
        {s.demo && <a data-testid={`project-demo-${s.id}`} href={s.demo} className="inline-flex items-center gap-1.5 border border-noc-ok px-3 py-2 font-mono text-xs text-emerald-400 hover:bg-noc-ok hover:text-noc-bg">Estudo de caso <ArrowUpRight size={14}/></a>}
        {!target && <span className="font-mono text-xs text-amber-300">Detalhes internos não divulgados</span>}
      </div>
      <div className="project-cover"><div className="project-cover-inner">
        {target ? <a href={target} target={s.demo ? undefined : "_blank"} rel={s.demo ? undefined : "noopener noreferrer"} aria-label={`Abrir ${s.demo ? "estudo de caso" : "repositório"}: ${s.name}`}>
          <img src={img} loading="lazy" alt={`Capa conceitual: ${s.name}`} /><span className="project-cover-tag">{s.demo ? "ESTUDO DE CASO ↗" : "REPOSITÓRIO ↗"}</span>
        </a> : <div><img src={img} loading="lazy" alt={`Capa conceitual: ${s.name}`} /><span className="project-cover-tag">EM DESENVOLVIMENTO</span></div>}
      </div></div>
    </article>
  );
};
export const ServicosApp = () => <div data-testid="app-servicos"><Banner/><div className="border-b border-noc-line">{SERVICES.map(s => <Row key={s.id} s={s}/>)}</div></div>;

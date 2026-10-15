import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Bot, Code2, ExternalLink, FolderGit2, Network, ShieldCheck } from "lucide-react";
import { TECHNICAL_CATEGORIES, TECHNICAL_PROJECTS } from "../../../content/technicalProjects";

const PROJECT_ICONS = { hermes: Bot, tluizlabs: Network, "infra-labs": Code2 };

const ProjectCard = ({ project, index }) => {
  const Icon = PROJECT_ICONS[project.id] || FolderGit2;

  return (
    <article
      data-testid={`technical-project-${project.id}`}
      className="group flex min-w-0 flex-col overflow-hidden border border-noc-line bg-noc-panel/75 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-noc-ok/70"
    >
      <div className="relative flex items-center justify-between gap-4 border-b border-noc-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center border border-noc-ok/30 bg-noc-ok/10 text-emerald-400">
            <Icon size={20} strokeWidth={1.6} />
          </div>
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-400">{project.kicker}</div>
            <p className="mt-1 font-mono text-[11px] text-slate-400">LAB/{String(index + 1).padStart(2, "0")}</p>
          </div>
        </div>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-slate-400">{project.category}</span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5">
        <h3 className="font-display text-[clamp(1.55rem,4vw,2.2rem)] font-bold uppercase leading-[1.02] tracking-tight text-slate-50">
          {project.name}
        </h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-emerald-400">{project.status}</p>
        <p className="mt-4 font-mono text-[13px] leading-relaxed text-slate-300">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-1.5" aria-label={`Tecnologias: ${project.name}`}>
          {project.stack.map((item) => (
            <span key={item} className="border border-noc-line2 bg-noc-bg/50 px-2 py-1 font-mono text-[11px] text-slate-200">{item}</span>
          ))}
        </div>

        <div className="mt-5 border-t border-noc-line pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">O que está documentado</p>
          <ul className="mt-3 space-y-2">
            {project.evidence.map((item) => (
              <li key={item} className="flex gap-2 font-mono text-xs leading-relaxed text-slate-300">
                <span aria-hidden="true" className="text-emerald-400">›</span>{item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
          <a
            data-testid={`technical-repository-${project.id}`}
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-noc-ok px-3 py-3 font-mono text-[11px] font-bold uppercase text-noc-bg transition-colors hover:bg-emerald-300"
          >
            <FolderGit2 size={15} /> Repositório <ExternalLink size={12} />
          </a>
          <a
            data-testid={`technical-docs-${project.id}`}
            href={project.documentation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-noc-line2 px-3 py-3 font-mono text-[11px] uppercase text-slate-100 transition-colors hover:border-noc-ok hover:text-emerald-300"
          >
            <BookOpen size={15} /> Documentação <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
};

export const ProjetosTecnicosApp = () => {
  const [category, setCategory] = useState("Todos");
  const visible = useMemo(
    () => category === "Todos"
      ? TECHNICAL_PROJECTS
      : TECHNICAL_PROJECTS.filter((project) => project.category === category),
    [category]
  );

  return (
    <section data-testid="app-projetos-tecnicos" className="space-y-5">
      <header className="relative overflow-hidden border border-noc-line2 bg-noc-panel/60 p-4 sm:p-6">
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full border border-noc-ok/20 bg-noc-ok/5" aria-hidden="true" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">L0·NOC / Repositórios técnicos</p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-slate-50">
          Projetos técnicos<span className="text-emerald-400">.</span>
        </h2>
        <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-slate-300">
          Ferramentas próprias e laboratórios documentados em IA local, Linux, redes e operações de TI.
          Acesse o código e os registros públicos para conhecer as soluções e os problemas explorados.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400">
          <ShieldCheck size={15} className="text-emerald-400" />
          <span>Somente referências públicas — sem inventários, credenciais ou sistemas internos.</span>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar projetos técnicos">
        {TECHNICAL_CATEGORIES.map((item) => (
          <button
            data-testid={`technical-filter-${item === "Todos" ? "todos" : item === "IA local" ? "ia" : item === "Infraestrutura" ? "infra" : "labs"}`}
            type="button"
            key={item}
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={`min-h-10 border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${category === item
              ? "border-noc-ok bg-noc-ok text-noc-bg"
              : "border-noc-line2 text-slate-200 hover:border-noc-ok hover:text-emerald-300"}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div data-testid="technical-project-grid" className="grid items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard project={project} key={project.id} index={TECHNICAL_PROJECTS.indexOf(project)} />
        ))}
      </div>

      <p className="border-t border-noc-line pt-4 font-mono text-xs leading-relaxed text-slate-400">
        Laboratórios e ferramentas de estudo não representam serviços públicos em produção.
        Informações de ambientes institucionais permanecem fora desta página.
      </p>
    </section>
  );
};

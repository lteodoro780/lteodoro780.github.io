import { useState } from "react";
import { SKILLS, SKILL_GROUPS } from "../../../content";

const slug = s => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
export const MetricasApp = () => {
  const [tab, setTab] = useState("Tudo");
  const list = tab === "Tudo" ? SKILLS : SKILLS.filter(s => s.group === tab);
  return (
    <div data-testid="app-metricas">
      <p className="mb-4 font-mono text-sm leading-relaxed text-slate-300">Competências demonstradas por atividades, projetos e documentação. Não utilizo percentuais subjetivos de proficiência.</p>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar competências">
        {SKILL_GROUPS.map(g => <button type="button" key={g} data-testid={`skill-filter-${slug(g)}`} aria-pressed={tab === g} onClick={() => setTab(g)} className={`border px-3 py-2 font-mono text-xs uppercase tracking-wider ${tab === g ? "border-noc-ok bg-noc-ok text-noc-bg" : "border-noc-line text-slate-200 hover:border-noc-ok"}`}>{g}</button>)}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map(s => <article key={s.name} data-testid={`skill-evidence-${slug(s.name)}`} className="border border-noc-line bg-noc-panel/80 p-4">
          <h3 className="font-display text-2xl font-bold uppercase text-slate-50">{s.name}</h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-wider text-emerald-400">{s.group}</p>
          <p className="mt-3 font-mono text-sm leading-relaxed text-slate-300">{s.evidence}</p>
        </article>)}
      </div>
    </div>
  );
};

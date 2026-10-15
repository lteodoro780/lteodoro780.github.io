import { ArrowUpRight, BriefcaseBusiness, Camera, Cpu, FileText, Network } from "lucide-react";
import { GALLERY_PHOTOS, PHOTO_GROUPS } from "../../../content/galleryPhotos";
import { PROFILE, SERVICES, SKILLS, SKILL_GROUPS } from "../../../content";
import { Panel } from "../../noc/Primitives";

const publicCases = SERVICES.filter((project) => Boolean(project.demo));
const photoGroups = PHOTO_GROUPS.filter((group) => group !== "Tudo").map((group) => ({
  group,
  count: GALLERY_PHOTOS.filter((photo) => photo.group === group).length,
}));
const maximum = Math.max(1, ...photoGroups.map((item) => item.count));
const competenceGroups = SKILL_GROUPS.filter((group) => group !== "Tudo").map((group) => ({
  group,
  count: SKILLS.filter((skill) => skill.group === group).length,
}));

const Metric = ({ icon: Icon, value, label, detail, testid }) => (
  <article data-testid={testid} className="relative overflow-hidden border border-noc-line bg-noc-panel/75 p-4 sm:p-5">
    <div className="flex items-start justify-between gap-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300">{label}</span>
      <Icon size={17} aria-hidden="true" className="shrink-0 text-emerald-400" />
    </div>
    <p className="mt-3 font-display text-4xl font-bold leading-none tabular-nums text-slate-50 sm:text-5xl">{value}</p>
    <p className="mt-2 font-mono text-xs leading-relaxed text-slate-400">{detail}</p>
  </article>
);

const GalleryChart = () => (
  <Panel testid="telemetry-photo-chart" title="Acervo técnico" meta="fotos por categoria" className="md:col-span-7">
    <p className="mb-5 font-mono text-xs leading-relaxed text-slate-300">
      Distribuição dos registros publicados na galeria. As barras representam quantidade de fotografias, não desempenho de sistemas.
    </p>
    <div className="space-y-5">
      {photoGroups.map(({ group, count }) => (
        <div key={group} data-testid={`telemetry-photo-${group}`} className="space-y-2">
          <div className="flex justify-between gap-2 font-mono text-xs">
            <span className="text-slate-200">{group}</span>
            <span className="tabular-nums text-emerald-400">{count} {count === 1 ? "foto" : "fotos"}</span>
          </div>
          <div className="h-2.5 overflow-hidden bg-slate-800" role="img" aria-label={`${group}: ${count} de ${GALLERY_PHOTOS.length} fotos`}>
            <div className="h-full bg-gradient-to-r from-emerald-800 to-emerald-400 transition-[width] duration-700" style={{ width: `${(count / maximum) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
    <a href={`${process.env.PUBLIC_URL}/bastidores.html`} className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-emerald-400 hover:text-emerald-300">
      Explorar fotografias <ArrowUpRight size={14} />
    </a>
  </Panel>
);

const SkillsMatrix = () => (
  <Panel testid="telemetry-skills" title="Áreas documentadas" meta="competências" className="md:col-span-5">
    <p className="mb-4 font-mono text-xs leading-relaxed text-slate-300">
      Quantidade de competências descritas no portfólio, agrupadas por área. Não é uma nota de proficiência.
    </p>
    <div className="grid grid-cols-2 gap-2">
      {competenceGroups.map(({ group, count }) => (
        <div key={group} className="border border-noc-line bg-noc-bg/50 p-3">
          <div className="font-display text-3xl font-bold tabular-nums text-slate-50">{count.toString().padStart(2, "0")}</div>
          <div className="mt-1 font-mono text-[11px] text-slate-300">{group}</div>
        </div>
      ))}
    </div>
    <p className="mt-4 font-mono text-xs text-slate-400">{SKILLS.length} competências descritas com exemplos de atividades.</p>
  </Panel>
);

const PublicEvidence = () => (
  <Panel testid="telemetry-public-projects" title="Estudos de caso" meta="acesso público" className="md:col-span-12">
    <div className="grid gap-2 lg:grid-cols-3">
      {publicCases.map((project, index) => (
        <a key={project.id} href={`${process.env.PUBLIC_URL}/${project.demo.replace(/^\.\//, "")}`}
          data-testid={`telemetry-project-${project.id}`}
          className="group flex min-w-0 flex-col justify-between gap-4 border border-noc-line bg-noc-bg/55 p-4 transition-colors hover:border-noc-ok">
          <div>
            <div className="font-mono text-[11px] tracking-widest text-emerald-400">{String(index + 1).padStart(2, "0")} / CASE STUDY</div>
            <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-slate-50">{project.name}</h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-300">{project.desc}</p>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
            Ver documentação <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </a>
      ))}
    </div>
    <p className="mt-4 font-mono text-xs leading-relaxed text-slate-400">
      {SERVICES.length - publicCases.length} projeto(s) adicional(is) em evolução sem estudo público. Os casos documentam trabalho realizado ou desenvolvimento em andamento, conforme indicado em cada página.
    </p>
  </Panel>
);

export const TelemetriaApp = () => (
  <section data-testid="app-telemetria" className="space-y-4">
    <header className="border border-noc-line2 bg-noc-panel/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-xs uppercase tracking-[0.17em] text-emerald-400">L0·NOC / Painel de evidências</span>
        <span className="font-mono text-[11px] text-slate-400">Dados do portfólio · leitura local</span>
      </div>
      <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-slate-50 sm:text-5xl">Telemetria profissional</h2>
      <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-slate-300">
        Indicadores extraídos dos projetos e registros publicados de {PROFILE.first} {PROFILE.last}. Este painel resume entregas e documentação; não acessa sistemas internos ou monitora infraestrutura em tempo real.
      </p>
    </header>

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Metric testid="telemetry-stat-projects" icon={BriefcaseBusiness} label="Projetos listados" value={SERVICES.length} detail="Documentados ou em evolução" />
      <Metric testid="telemetry-stat-cases" icon={FileText} label="Casos públicos" value={publicCases.length} detail="Estudos de caso acessíveis" />
      <Metric testid="telemetry-stat-photos" icon={Camera} label="Registros reais" value={GALLERY_PHOTOS.length} detail="Fotografias selecionadas" />
      <Metric testid="telemetry-stat-arm" icon={Cpu} label="Estações ARM" value="60+" detail="Participação em projeto colaborativo" />
    </div>

    <div className="grid gap-4 md:grid-cols-12">
      <GalleryChart />
      <SkillsMatrix />
      <PublicEvidence />
    </div>

    <footer className="flex flex-wrap items-start gap-2 border-t border-noc-line pt-3 font-mono text-[11px] leading-relaxed text-slate-400">
      <Network size={15} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
      <p>
        Fonte: projetos, competências e galeria deste portfólio. Contagens calculadas a partir do conteúdo cadastrado; o registro de 60+ dispositivos refere-se à Sala Vanguardeira. Nenhum valor representa SLA, desempenho em produção ou telemetria ao vivo.
      </p>
    </footer>
  </section>
);

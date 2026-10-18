import { motion } from "framer-motion";
import { LayerStack, LAYERS, LAYER_STATUS } from "../noc/LayerStack";
import { PROFILE } from "../../content";
import { useDesktop } from "../../lib/desktop";

// No celular, as mesmas quatro áreas das placas (L0–L3), com o mesmo destino.
const MOBILE_IDS = ["suporte", "windows", "linux", "automacao"];
const INFRA_AREAS = LAYERS.map((layer, i) => ({ ...layer, id: MOBILE_IDS[i], level: `L${i}` }));
export const Wallpaper = ({ ready }) => {
  const { open } = useDesktop();
  return <div data-testid="wallpaper" className="fixed inset-x-0 bottom-12 top-8 overflow-hidden">
    <div className="portfolio-wallpaper-solid absolute inset-0" aria-hidden="true"/>
    <div className="noc-grid absolute inset-0 opacity-35" aria-hidden="true"/>
    <div className="topology-central-host"><LayerStack /></div>
    <h1 className="sr-only">Portfólio de infraestrutura e sistemas</h1>
    <div className="topology-wallpaper-caption absolute bottom-7 left-6 hidden md:block">
      <p className="font-mono text-[11px] uppercase tracking-[0.17em] text-slate-400">
        <span className="text-emerald-400">&gt;</span> {PROFILE.role} · selecione um módulo para explorar
      </p>
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
      <div data-testid="mobile-infra-shortcuts" className="mt-4 border-t border-noc-line pt-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-emerald-300">Explorar por área</p>
        <div className="grid grid-cols-2 gap-2">
          {INFRA_AREAS.map(node => (
            <button
              key={node.id}
              data-testid={`mobile-infra-node-${node.id}`}
              type="button"
              onClick={() => open(node.app)}
              aria-label={`${node.level} · ${node.label}, ${LAYER_STATUS[node.status].label}`}
              className="flex min-h-10 items-center gap-2 border border-noc-line2 bg-noc-bg/90 px-2 py-2 text-left font-mono text-[10px] uppercase leading-tight text-slate-200 focus-visible:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-400"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: LAYER_STATUS[node.status].color }} aria-hidden="true" />
              <span><span className="text-emerald-300">{node.level}</span> · {node.label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  </div>;
};

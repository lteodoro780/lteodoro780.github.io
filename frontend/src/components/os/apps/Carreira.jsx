import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { INCIDENTS } from "../../../content";

const TYPE = { DEPLOY: "text-emerald-400 border-emerald-500/40", "MIGRAÇÃO": "text-cyan-400 border-cyan-500/40", BOOT: "text-amber-400 border-amber-500/40" };

const Row = ({ e, i, open, toggle }) => (
  <div data-testid={`incident-row-${i}`} className="border-t border-noc-line">
    <button data-testid={`incident-toggle-${i}`} aria-expanded={open} onClick={toggle} className="group w-full py-5 text-left">
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-slate-400">{e.ts}</span>
        <span className={`border px-2 py-0.5 ${TYPE[e.type]}`}>{e.type}</span>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4">
        <div>
          <div className="font-display text-3xl font-bold uppercase text-slate-50 transition-colors group-hover:text-emerald-400">{e.company}</div>
          <div className="font-mono text-sm text-slate-300">{e.role}</div>
        </div>
        <Plus size={18} className={`shrink-0 text-slate-300 transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
      </div>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
          <div data-testid={`incident-details-${i}`} className="space-y-3 pb-6">
            <p className="font-mono text-sm leading-relaxed text-slate-200">{e.summary}</p>
            <ul className="space-y-1.5 font-mono text-sm text-slate-300">
              {e.details.map((d) => <li key={d} className="flex gap-2"><span className="text-emerald-400">→</span>{d}</li>)}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export const CarreiraApp = () => {
  const [open, setOpen] = useState(0);
  return (
    <div data-testid="app-carreira">
      <p className="mb-4 font-mono text-sm text-slate-300">Trajetória profissional como um histórico de deploys. Clique para expandir.</p>
      <div className="border-b border-noc-line">
        {INCIDENTS.map((e, i) => (
          <Row key={e.ts} e={e} i={i} open={open === i} toggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </div>
  );
};

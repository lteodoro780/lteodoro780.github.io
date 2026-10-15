import { AnimatePresence, motion } from "framer-motion";
import { Power } from "lucide-react";
import { Logo } from "../noc/Logo";
import { APPS } from "./appMeta";
import { PROFILE } from "../../content";
import { useDesktop } from "../../lib/desktop";

const Item = ({ onClick, testid, icon: I, label, hint, danger }) => (
  <button
    data-testid={testid}
    onClick={onClick}
    className={`group flex w-full items-center gap-3 px-4 py-2.5 text-left font-mono text-sm transition-colors ${danger ? "text-red-400 hover:bg-red-500/10" : "text-slate-200 hover:bg-noc-panel"}`}
  >
    <I size={16} className={danger ? "" : "text-slate-400 group-hover:text-emerald-400"} />
    <span className="flex-1">{label}</span>
    {hint && <span className="text-xs text-slate-400">{hint}</span>}
  </button>
);

export const StartMenu = ({ open, onClose, onReboot }) => {
  const d = useDesktop();
  const run = (fn) => () => { fn(); onClose(); };
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            data-testid="start-menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-14 left-2 z-50 w-[min(340px,calc(100vw-1rem))] border border-noc-line2 bg-noc-bg/95 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-noc-line p-4">
              <Logo size={36} />
              <div>
                <div className="font-display text-2xl font-bold uppercase leading-none text-slate-50">Luis O. Florencio</div>
                <div className="mt-1 font-mono text-xs text-slate-400">{PROFILE.node}@l0-noc</div>
              </div>
            </div>
            <div className="py-2">
              {APPS.map((a) => (
                <Item key={a.id} testid={`start-item-${a.id}`} icon={a.icon} label={a.label} hint={a.title} onClick={run(() => d.open(a.id))} />
              ))}
            </div>
            <div className="border-t border-noc-line py-2">
              <Item testid="start-item-reboot" icon={Power} label="Reiniciar interface" onClick={run(onReboot)} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

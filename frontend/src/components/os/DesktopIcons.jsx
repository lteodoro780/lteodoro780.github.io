import { motion } from "framer-motion";
import { APPS } from "./appMeta";
import { useDesktop } from "../../lib/desktop";

const Icon = ({ label, icon: I, onClick, testid, i, ready }) => (
  <motion.button
    data-testid={testid}
    onClick={onClick}
    initial={{ opacity: 0, y: 12 }}
    animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
    transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
    className="group flex w-[76px] flex-col items-center gap-1.5 p-1 outline-none"
  >
    <span
      className={`cyber-desktop-icon grid h-14 w-14 place-items-center border bg-noc-panel/80 backdrop-blur transition-[border-color,transform,background-color] duration-300 group-hover:-translate-y-0.5 group-focus-visible:border-noc-ok border-noc-line text-slate-100 group-hover:border-noc-ok group-hover:text-emerald-400`}
    >
      <I size={22} strokeWidth={1.6} />
    </span>
    <span className="bg-noc-bg/70 px-1 font-mono text-xs text-slate-100">{label}</span>
  </motion.button>
);

export const DesktopIcons = ({ ready }) => {
  const { open } = useDesktop();
  return (
    <nav
      data-testid="desktop-icons"
      className="fixed left-0 right-0 top-8 z-[5] grid grid-cols-4 justify-items-center gap-y-4 px-2 pt-5 md:right-auto md:grid-flow-col md:grid-cols-none md:grid-rows-4 md:gap-x-2 md:px-4"
    >
      {APPS.map((a, i) => (
        <Icon key={a.id} testid={`desktop-icon-${a.id}`} label={a.label} icon={a.icon} i={i} ready={ready} onClick={() => open(a.id)} />
      ))}
    </nav>
  );
};

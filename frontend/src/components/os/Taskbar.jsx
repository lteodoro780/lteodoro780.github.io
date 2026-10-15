import { useState } from "react";
import { Logo } from "../noc/Logo";
import { APP } from "./appMeta";
import { useDesktop } from "../../lib/desktop";
import { useInterval } from "../../lib/live";

const hm = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const Clock = () => {
  const [t, setT] = useState(hm);
  useInterval(() => setT(hm()), 5000);
  return <span data-testid="taskbar-clock" className="font-mono text-xs tabular-nums text-slate-200">{t}</span>;
};

const TaskButton = ({ id }) => {
  const d = useDesktop();
  const st = d.wins[id];
  const meta = APP[id];
  const I = meta.icon;
  const on = d.top === id;
  const click = () => {
    if (st.min) d.open(id);
    else if (on) d.minimize(id);
    else d.focus(id);
  };
  return (
    <button
      data-testid={`taskbar-app-${id}`}
      onClick={click}
      className={`relative flex h-9 shrink-0 items-center gap-2 border px-2.5 font-mono text-xs transition-colors ${on ? "border-noc-line2 bg-noc-panel text-slate-50" : "border-transparent text-slate-300 hover:bg-noc-panel/60"}`}
    >
      <I size={15} className={on ? "text-emerald-400" : ""} />
      <span className="hidden lg:inline">{meta.title}</span>
      <span className={`absolute inset-x-2 bottom-0 h-0.5 ${st.min ? "bg-noc-line2" : "bg-noc-ok"}`} />
    </button>
  );
};

export const Taskbar = ({ onStart, startOpen }) => {
  const d = useDesktop();
  return (
    <footer data-testid="taskbar" className="cyber-taskbar fixed inset-x-0 bottom-0 z-50 flex h-12 items-center gap-2 border-t border-noc-line bg-noc-bg px-2">
      <button
        data-testid="start-button"
        onClick={onStart}
        className={`flex h-9 shrink-0 items-center gap-2 border px-2 transition-colors ${startOpen ? "border-noc-ok bg-noc-ok/10" : "border-noc-line hover:border-noc-line2"}`}
      >
        <Logo size={22} />
        <span className="hidden font-display text-lg font-bold tracking-wide text-slate-50 sm:inline">L0·NOC</span>
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {Object.keys(d.wins).map((id) => <TaskButton key={id} id={id} />)}
      </div>
      <div className="flex shrink-0 items-center gap-3 pr-1">
        <span className="hidden font-mono text-xs tracking-wider text-emerald-400 lg:inline">PORTFÓLIO PROFISSIONAL</span>
        <Clock />
      </div>
    </footer>
  );
};

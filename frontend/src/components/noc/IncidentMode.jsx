import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, RotateCcw, Siren, X } from "lucide-react";
import { STEPS, useIncident } from "../../lib/incident";
import { useInterval } from "../../lib/live";

const fmt = (ms) => {
  const s = ms / 1000;
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${(s % 60).toFixed(1).padStart(4, "0")}`;
};

const Elapsed = ({ since }) => {
  const [now, setNow] = useState(Date.now());
  useInterval(() => setNow(Date.now()), 100);
  return <span className="tabular-nums">{fmt(now - since)}</span>;
};

const Overlay = ({ on }) => (
  <AnimatePresence>
    {on && (
      <motion.div
        data-testid="incident-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.2 } }}
        className="pointer-events-none fixed inset-0 z-40"
      >
        <div className="incident-vignette absolute inset-0" />
        <div className="incident-sweep absolute inset-x-0 h-40" />
      </motion.div>
    )}
  </AnimatePresence>
);

const StepList = ({ step }) => (
  <ol className="space-y-3">
    {STEPS.slice(0, step + 1).map((s, i) => {
      const last = i === STEPS.length - 1;
      return (
        <motion.li key={s.label} data-testid={`incident-step-${i}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
          <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border ${last ? "border-noc-ok text-emerald-400" : i === 0 ? "border-red-500 text-red-400" : "border-noc-line2 text-slate-300"}`}>
            <Check size={12} />
          </span>
          <div className="font-mono text-xs leading-relaxed sm:text-sm">
            <span className={last ? "text-emerald-400" : i === 0 ? "text-red-400" : "text-slate-100"}>{s.label}</span>
            <span className="block text-slate-300">{s.text}</span>
          </div>
        </motion.li>
      );
    })}
  </ol>
);

const PostMortem = ({ mttr, stepMs }) => {
  const rows = [
    ["Detecção", fmt(stepMs)],
    ["MTTR", fmt(mttr)],
    ["Causa raiz", "pico de tráfego sem autoscaling agressivo"],
    ["Correção", "HPA ajustado + alerta de saturação antecipado"],
    ["Aprendizado", "escalar antes de saturar, não depois"],
  ];
  return (
    <motion.div data-testid="incident-postmortem" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 border-t border-noc-line pt-4">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">Post-mortem · sem culpados</div>
      <dl className="space-y-2 font-mono text-xs sm:text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
            <dt className="text-slate-400">{k}</dt>
            <dd data-testid={`incident-pm-${k.toLowerCase().replace(/\s/g, "-")}`} className="text-slate-100">{v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
};

export const IncidentMode = () => {
  const { step, active, resolved, start, close, startedAt, mttr, id, stepMs } = useIncident();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      <Overlay on={active} />
      <AnimatePresence>
        {step >= 0 && (
          <motion.aside
            data-testid="incident-panel"
            role="alertdialog"
            aria-label="Simulação de incidente"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className={`fixed bottom-16 right-4 z-[55] max-h-[calc(100svh-6.5rem)] w-[calc(100vw-2rem)] max-w-[440px] overflow-y-auto border bg-noc-bg/95 p-5 shadow-2xl backdrop-blur-xl transition-colors duration-700 ${resolved ? "border-noc-ok/60" : "border-red-500/70"}`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] ${resolved ? "text-emerald-400" : "text-red-400"}`}>
                  <Siren size={14} className={resolved ? "" : "animate-pulse"} />
                  {resolved ? "Resolvido" : "Incidente ativo"} · P1
                </div>
                <div data-testid="incident-id" className="mt-1 font-display text-3xl font-bold uppercase text-slate-50">{id}</div>
              </div>
              <div className="flex items-center gap-2">
                <span data-testid="incident-timer" className="font-mono text-sm text-slate-200">
                  {resolved ? fmt(mttr) : <Elapsed since={startedAt} />}
                </span>
                <button data-testid="incident-close" aria-label="Fechar" onClick={close} className="grid h-8 w-8 place-items-center border border-noc-line text-slate-300 transition-colors hover:border-slate-300 hover:text-slate-50">
                  <X size={14} />
                </button>
              </div>
            </div>
            <StepList step={step} />
            {resolved && <PostMortem mttr={mttr} stepMs={stepMs} />}
            {resolved && (
              <button data-testid="incident-replay" onClick={start} className="mt-5 inline-flex items-center gap-2 border border-noc-ok px-3 py-2 font-mono text-xs uppercase tracking-wider text-emerald-400 transition-colors hover:bg-noc-ok hover:text-noc-bg">
                <RotateCcw size={13} /> Rodar de novo
              </button>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "../noc/Logo";

const LINES = [
  "L0·NOC BIOS v1.0 · luis-o-florencio-01",
  "verificando memória ............ OK",
  "montando /dev/portfolio ........ OK",
  "iniciando telemetria ........... OK",
  "carregando área de trabalho .... OK",
];

export const Boot = ({ onDone }) => {
  const [n, setN] = useState(0);

  useEffect(() => {
    const t = setTimeout(n >= LINES.length ? onDone : () => setN(n + 1), n >= LINES.length ? 450 : 260);
    return () => clearTimeout(t);
  }, [n, onDone]);

  useEffect(() => {
    window.addEventListener("keydown", onDone);
    return () => window.removeEventListener("keydown", onDone);
  }, [onDone]);

  return (
    <motion.div
      data-testid="boot-screen"
      onClick={onDone}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[70] flex cursor-pointer flex-col justify-end bg-[#05070B] p-6 sm:p-12"
    >
      <Logo size={44} />
      <div className="mt-6 space-y-1.5 font-mono text-xs sm:text-sm">
        {LINES.slice(0, n).map((l, i) => (
          <motion.div key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={i === 0 ? "text-slate-100" : "text-slate-300"}>
            {l.endsWith("OK") ? <>{l.slice(0, -2)}<span className="text-emerald-400">OK</span></> : l}
          </motion.div>
        ))}
      </div>
      <div className="mt-6 h-1 w-full max-w-md bg-noc-line">
        <motion.div className="h-full bg-noc-ok" animate={{ width: `${(n / LINES.length) * 100}%` }} transition={{ duration: 0.25 }} />
      </div>
      <p className="mt-5 font-mono text-xs text-slate-400">clique ou pressione qualquer tecla para pular</p>
    </motion.div>
  );
};

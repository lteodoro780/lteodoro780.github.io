import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Panel, Gauge } from "./Primitives";
import { useInterval, useJitter, useSeries, seeded, timeNow } from "../../lib/live";

const wave = (i) => 520 + Math.sin(i / 3) * 140 + Math.random() * 120;

const toPath = (s, w, h, max) =>
  s.map((v, i) => `${i ? "L" : "M"}${((i / (s.length - 1)) * w).toFixed(1)},${(h - (v / max) * h).toFixed(1)}`).join(" ");

export const Throughput = () => {
  const s = useSeries(48, wave, 900);
  const err = useSeries(48, () => 20 + Math.random() * 40, 900);
  const line = toPath(s, 600, 200, 900);
  return (
    <Panel testid="bento-widget-throughput" title="Throughput simulado · req/s" meta="dados fictícios" className="lg:col-span-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-display text-6xl font-bold tabular-nums text-slate-50 sm:text-7xl">{Math.round(s[s.length - 1])}</div>
          <div className="font-mono text-xs uppercase tracking-widest text-slate-400">requisições / segundo</div>
        </div>
        <div className="flex gap-5 font-mono text-xs text-slate-300">
          <span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-noc-ok" /> 2xx</span>
          <span className="flex items-center gap-2"><i className="h-0.5 w-4 bg-noc-warn" /> 4xx/5xx</span>
        </div>
      </div>
      <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="mt-6 h-44 w-full flex-1 sm:h-56">
        {[0, 1, 2, 3].map((g) => (
          <line key={g} x1="0" x2="600" y1={g * 66} y2={g * 66} stroke="#1E293B" strokeDasharray="3 5" />
        ))}
        <defs>
          <linearGradient id="tp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L600,200 L0,200 Z`} fill="url(#tp)" />
        <path d={line} fill="none" stroke="#10B981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        <path d={toPath(err, 600, 200, 900)} fill="none" stroke="#F59E0B" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </Panel>
  );
};

export const Resources = () => {
  const cpu = useJitter(42, 14, 1500);
  const mem = useJitter(63, 6, 1800);
  const load = useJitter(1.4, 0.4, 1600, 2);
  return (
    <Panel testid="bento-widget-resources" title="Recursos simulados · node-01" meta="dados fictícios" className="lg:col-span-4">
      <div className="grid flex-1 grid-cols-2 place-items-center gap-4">
        {[["CPU", cpu, "#10B981", "bento-widget-cpu"], ["MEM", mem, "#06B6D4", "bento-widget-memory"]].map(([k, v, c, t]) => (
          <div key={k} data-testid={t} className="flex flex-col items-center gap-2">
            <Gauge value={v} size={128} color={c}>
              <div className="text-center">
                <div className="font-display text-4xl font-bold tabular-nums text-slate-50">{v}%</div>
              </div>
            </Gauge>
            <span className="font-mono text-xs tracking-[0.25em] text-slate-300">{k}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-noc-line pt-4 font-mono text-xs text-slate-400">
        <span>LOAD AVG</span>
        <span className="tabular-nums text-slate-100">{load} · {(load * 0.9).toFixed(2)} · {(load * 0.8).toFixed(2)}</span>
      </div>
    </Panel>
  );
};

const TEMPLATES = [
  ["INFO", "ingress", () => `GET /portfolio 200 · ${8 + Math.floor(Math.random() * 12)}ms`],
  ["OK", "ci", () => `pipeline #${1000 + Math.floor(Math.random() * 900)} passou · deploy concluído`],
  ["INFO", "k8s", () => `pod laboratorio-${Math.random().toString(16).slice(2, 7)} pronto`],
  ["WARN", "cache", () => `hit ratio ${80 + Math.floor(Math.random() * 10)}% · aquecendo`],
  ["INFO", "metrics", () => `scrape ok · ${1200 + Math.floor(Math.random() * 400)} séries`],
  ["OK", "backup", () => "snapshot diário concluído"],
  ["INFO", "dns", () => "resolve l0.noc → 200 OK"],
];
const LVL = { INFO: "text-cyan-400", OK: "text-emerald-400", WARN: "text-amber-400" };
let seq = 0;
const mkLog = () => {
  const [lvl, src, msg] = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  seq += 1;
  return { id: seq, t: timeNow(), lvl, src, msg: msg() };
};

export const LogTail = () => {
  const [logs, setLogs] = useState(() => Array.from({ length: 9 }, mkLog));
  const [paused, setPaused] = useState(false);
  useInterval(() => { if (!paused) setLogs((l) => [...l.slice(-8), mkLog()]); }, 1400);
  return (
    <Panel testid="bento-widget-logs" title="tail -f /var/log/noc" meta={paused ? "pausado" : "streaming"} className="lg:col-span-7">
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="flex-1 space-y-1.5 overflow-hidden font-mono text-xs sm:text-sm">
        {logs.map((l) => (
          <motion.div key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="flex gap-3 whitespace-nowrap">
            <span className="text-slate-400">{l.t}</span>
            <span className={`w-10 shrink-0 ${LVL[l.lvl]}`}>{l.lvl}</span>
            <span className="hidden w-16 shrink-0 text-slate-300 sm:inline">{l.src}</span>
            <span className="truncate text-slate-200">{l.msg}</span>
          </motion.div>
        ))}
        <div className="flex items-center gap-1 text-emerald-400">$<span className="caret h-4 w-2 bg-emerald-400" /></div>
      </div>
    </Panel>
  );
};

export const Heatmap = () => {
  const cells = useMemo(() => Array.from({ length: 7 * 26 }, (_, i) => seeded(i)), []);
  const color = (v) => (v > 0.97 ? "#F59E0B" : `rgba(16,185,129,${0.25 + v * 0.75})`);
  return (
    <Panel testid="bento-widget-heatmap" title="Disponibilidade simulada" meta="26 semanas fictícias" className="lg:col-span-5">
      <div className="grid flex-1 grid-flow-col grid-rows-7 gap-[3px]">
        {cells.map((v, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: (i % 26) * 0.025 }}
            className="aspect-square w-full"
            style={{ background: color(v) }}
          />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between font-mono text-xs text-slate-400">
        <span>menos</span>
        <span className="text-slate-100">DADOS SINTÉTICOS</span>
        <span>mais</span>
      </div>
    </Panel>
  );
};

export const Tile = ({ label, value, unit, delta, testid }) => (
  <div data-testid={testid} className="noc-panel border border-noc-line bg-noc-panel/80 p-5 transition-colors duration-500 hover:border-noc-line2">
    <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
    <div className="mt-3 flex items-baseline gap-1">
      <span className="font-display text-5xl font-bold tabular-nums text-slate-50">{value}</span>
      <span className="font-mono text-sm text-slate-400">{unit}</span>
    </div>
    <div className="mt-2 font-mono text-xs text-emerald-400">{delta}</div>
  </div>
);

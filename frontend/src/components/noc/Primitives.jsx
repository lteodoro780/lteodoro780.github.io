import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

const line = {
  hidden: { y: "105%" },
  show: (i) => ({ y: 0, transition: { duration: 1, ease: EASE, delay: i * 0.09 } }),
};

export const SectionHead = ({ index, code, lines, kicker, testid }) => (
  <div data-testid={testid} className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-slate-400 lg:col-span-3 lg:items-start lg:pt-3">
      <span className="text-noc-ok">{index}</span>
      <span className="h-px w-10 bg-noc-line2" />
      <span>{code}</span>
    </div>
    <div className="lg:col-span-9">
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="font-display text-5xl font-extrabold uppercase leading-[0.88] tracking-tight text-slate-50 sm:text-6xl lg:text-8xl"
      >
        {lines.map((l, i) => (
          <span key={l} className="block overflow-hidden pb-[0.06em]">
            <motion.span custom={i} variants={line} className="block">
              {l}
            </motion.span>
          </span>
        ))}
      </motion.h2>
      {kicker && (
        <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-slate-400 sm:text-base">{kicker}</p>
      )}
    </div>
  </div>
);

export const Dot = ({ color = "bg-noc-ok", ping = false }) => (
  <span className="relative inline-flex h-2 w-2">
    {ping && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`} />}
    <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
  </span>
);

export const Panel = ({ title, meta, className = "", children, testid }) => (
  <div
    data-testid={testid}
    className={`noc-panel group relative flex flex-col border border-noc-line bg-noc-panel/80 transition-colors duration-500 hover:border-noc-line2 ${className}`}
  >
    <div className="flex items-center justify-between gap-3 border-b border-noc-line px-4 py-2.5">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-300">
        <Dot ping={false} />
        {title}
      </div>
      <span className="font-mono text-xs text-slate-400">{meta}</span>
    </div>
    <div className="flex flex-1 flex-col p-4 sm:p-5">{children}</div>
  </div>
);

export const Gauge = ({ value, size = 120, stroke = 7, color = "#10B981", onView = false, children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const arc = c * 0.75;
  const off = arc * (1 - value / 100);
  const common = { cx: size / 2, cy: size / 2, r, fill: "none", strokeWidth: stroke, strokeDasharray: `${arc} ${c}` };
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[135deg]">
        <circle {...common} stroke="#1E293B" />
        {onView ? (
          <motion.circle
            {...common}
            stroke={color}
            variants={{ hidden: { strokeDashoffset: arc }, show: { strokeDashoffset: off, transition: { duration: 1.6, ease: EASE } } }}
          />
        ) : (
          <circle {...common} stroke={color} strokeDashoffset={off} style={{ transition: "stroke-dashoffset .9s cubic-bezier(.16,1,.3,1)" }} />
        )}
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
};

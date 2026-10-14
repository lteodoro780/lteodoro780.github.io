import { useEffect, useRef } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { Copy, Minus, Square, X } from "lucide-react";
import Lenis from "lenis";
import { useDesktop } from "../../lib/desktop";

const useWindowLenis = (ref) => {
  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ wrapper, content: wrapper.firstElementChild, duration: 1.1 });
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [ref]);
};

const Ctrl = ({ onClick, label, testid, danger, children }) => (
  <button
    data-testid={testid}
    aria-label={label}
    onPointerDown={(e) => e.stopPropagation()}
    onClick={onClick}
    className={`grid h-7 w-7 place-items-center border border-transparent text-slate-300 transition-colors ${danger ? "hover:bg-red-500 hover:text-white" : "hover:border-noc-line2 hover:text-slate-50"}`}
  >
    {children}
  </button>
);

export const Window = ({ id, meta, st, isTop, mobile, areaRef, children }) => {
  const d = useDesktop();
  const controls = useDragControls();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const body = useRef(null);
  useWindowLenis(body);
  const full = mobile || st.max;
  const Icon = meta.icon;
  useEffect(() => {
    if (!full) return undefined;
    const t = setTimeout(() => { mx.set(0); my.set(0); }, 50);
    return () => clearTimeout(t);
  }, [full, mx, my]);
  const end = () => {
    d.move(id, st.x + mx.get(), st.y + my.get());
    mx.set(0);
    my.set(0);
  };
  const box = full ? { left: 0, top: 0, width: "100%", height: "100%" } : { left: st.x, top: st.y, width: st.w, height: st.h };

  return (
    <motion.section
      data-testid={`window-${id}`}
      role="dialog"
      aria-label={meta.label}
      onPointerDown={() => d.focus(id)}
      drag={!full}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={full ? undefined : areaRef}
      onDragEnd={end}
      style={{ x: mx, y: my, zIndex: st.z, ...box }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-auto absolute flex flex-col overflow-hidden border bg-noc-bg/95 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-[border-color] duration-300 ${isTop ? "border-noc-line2" : "border-noc-line"}`}
    >
      <header
        onPointerDown={(e) => { if (!full) controls.start(e); }}
        onDoubleClick={() => { if (!mobile) d.toggleMax(id); }}
        style={{ touchAction: "none" }}
        className={`flex h-10 shrink-0 select-none items-center justify-between gap-3 border-b border-noc-line pl-3 pr-1.5 ${full ? "" : "cursor-grab active:cursor-grabbing"} ${isTop ? "bg-noc-panel" : "bg-noc-bg"}`}
      >
        <div className="flex min-w-0 items-center gap-2 font-mono text-xs">
          <Icon size={14} className={isTop ? "text-emerald-400" : "text-slate-400"} />
          <span data-testid={`window-title-${id}`} className={`truncate ${isTop ? "text-slate-100" : "text-slate-400"}`}>{meta.title}</span>
          <span className="hidden text-slate-400 sm:inline">— L0·NOC</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Ctrl testid={`window-min-${id}`} label="Minimizar" onClick={() => d.minimize(id)}><Minus size={14} /></Ctrl>
          {!mobile && (
            <Ctrl testid={`window-max-${id}`} label="Maximizar" onClick={() => d.toggleMax(id)}>
              {st.max ? <Copy size={12} /> : <Square size={12} />}
            </Ctrl>
          )}
          <Ctrl testid={`window-close-${id}`} label="Fechar" danger onClick={() => d.close(id)}><X size={14} /></Ctrl>
        </div>
      </header>
      <div ref={body} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </motion.section>
  );
};

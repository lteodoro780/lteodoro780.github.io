import { motion } from "framer-motion";
import { LayerStack } from "../noc/LayerStack";
import { EASE } from "../noc/Primitives";
import { PROFILE } from "../../content";
const Line = ({ ready, delay, children }) => (
  <span className="block overflow-hidden pb-[0.02em]">
    <motion.span className="block" initial={{ y: "108%" }} animate={ready ? { y: 0 } : { y: "108%" }} transition={{ duration: 1.2, ease: EASE, delay }}>{children}</motion.span>
  </span>
);
export const Wallpaper = ({ ready }) => (
  <div data-testid="wallpaper" className="fixed inset-x-0 bottom-12 top-8 overflow-hidden">
    <div className="noc-grid absolute inset-0 opacity-60" />
    <img src={`${process.env.PUBLIC_URL}/img/rack.jpg`} alt="" aria-hidden="true" className="wallpaper-photo absolute right-0 top-0 h-full w-full object-cover opacity-25 grayscale contrast-125 md:w-[60%]" />
    <div className="absolute inset-0 bg-noc-ok/5 mix-blend-color" />
    <div className="topology-central-host"><LayerStack /></div>
    <div className="wallpaper-intro absolute bottom-5 left-4 right-4 md:bottom-8 md:left-8">
      <h1 data-testid="wallpaper-name" className="font-display text-[26vw] font-extrabold uppercase leading-[0.8] tracking-[-0.02em] text-slate-50 md:text-[9rem] xl:text-[12rem]">
        <Line ready={ready} delay={0.1}>{PROFILE.first}</Line>
        <Line ready={ready} delay={0.25}><span className="text-outline">{PROFILE.last}</span><span className="text-noc-ok">.</span></Line>
      </h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-300"><span className="text-emerald-400">&gt;</span> {PROFILE.role} · clique nos ícones para explorar</motion.p>
    </div>
  </div>
);

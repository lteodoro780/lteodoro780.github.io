import { createContext, useContext, useEffect, useRef, useState } from "react";
import { APP, APPS } from "../components/os/appMeta";

const TOP = 32;
const BAR = 48;

const place = (id, n, anchor) => {
  const a = APP[id];
  const vw = window.innerWidth;
  const vh = window.innerHeight - TOP - BAR;
  const w = Math.min(a.w, vw - 32);
  const h = Math.min(a.h, vh - 24);
  const idx = APPS.findIndex((x) => x.id === id);
  const x = anchor === "right" ? vw - w - 48 : Math.max(16, Math.min(220 + idx * 40 + n * 14, vw - w - 16));
  const y = Math.max(12, Math.min(20 + idx * 24, vh - h - 12));
  return { x, y, w, h };
};

const Ctx = createContext(null);

export const DesktopProvider = ({ children }) => {
  const [wins, setWins] = useState({});
  const z = useRef(10);
  const bump = () => {
    z.current += 1;
    return z.current;
  };
  const top = Object.entries(wins).filter(([, v]) => !v.min).sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null;

  const open = (id, anchor) =>
    setWins((w) => {
      const nz = bump();
      const cur = w[id];
      return { ...w, [id]: cur ? { ...cur, min: false, z: nz } : { ...place(id, Object.keys(w).length, anchor), min: false, max: false, z: nz } };
    });
  const patch = (id, p) => setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], ...p } } : w));
  const close = (id) => setWins(({ [id]: _gone, ...rest }) => rest);
  const focus = (id) => { if (id !== top) patch(id, { z: bump() }); };
  const minimize = (id) => patch(id, { min: true });
  const toggleMax = (id) => setWins((w) => ({ ...w, [id]: { ...w[id], max: !w[id].max, z: bump() } }));
  const move = (id, x, y) => patch(id, { x, y });

  return (
    <Ctx.Provider value={{ wins, top, open, close, focus, minimize, toggleMax, move }}>
      {children}
    </Ctx.Provider>
  );
};

export const useDesktop = () => useContext(Ctx);

export const useIsMobile = () => {
  const q = "(max-width: 767px)";
  const [m, setM] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
};

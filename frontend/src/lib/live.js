import { useEffect, useRef, useState } from "react";

export const useInterval = (fn, ms) => {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
};

export const useJitter = (base, spread, ms = 1200, digits = 0) => {
  const [v, setV] = useState(base);
  useInterval(() => setV(+(base + (Math.random() - 0.5) * 2 * spread).toFixed(digits)), ms);
  return v;
};

export const useSeries = (len, gen, ms = 900) => {
  const [s, setS] = useState(() => Array.from({ length: len }, (_, i) => gen(i)));
  useInterval(() => setS((p) => [...p.slice(1), gen(p.length)]), ms);
  return s;
};

export const useClock = () => {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(Date.now());
  useInterval(() => setNow(Date.now()), 1000);
  const s = Math.floor((now - start) / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

export const seeded = (i) => {
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export const timeNow = () => new Date().toLocaleTimeString("pt-BR", { hour12: false });

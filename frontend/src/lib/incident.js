import { createContext, useContext, useEffect, useState } from "react";

export const STEPS = [
  { label: "ALERTA", text: "p99 do ingress acima de 800ms · taxa de erro 7.2%" },
  { label: "ACIONADO", text: "on-call notificado · analista designado assumiu o incidente" },
  { label: "DIAGNÓSTICO", text: "pods do app com CPU em 98% após pico de tráfego" },
  { label: "MITIGAÇÃO", text: "réplicas escaladas 4 → 12 · nó degradado drenado" },
  { label: "RESOLVIDO", text: "latência e erros de volta ao normal" },
];
const STEP_MS = 1600;

const Ctx = createContext({ step: -1, active: false, resolved: false, start: () => {}, close: () => {} });

export const IncidentProvider = ({ children }) => {
  const [step, setStep] = useState(-1);
  const [startedAt, setStartedAt] = useState(0);
  const [mttr, setMttr] = useState(0);
  const [id, setId] = useState("");

  useEffect(() => {
    if (step < 0 || step >= STEPS.length - 1) return undefined;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    if (step === STEPS.length - 1) setMttr(Date.now() - startedAt);
  }, [step, startedAt]);

  const start = () => {
    setId(`INC-${Math.floor(1000 + Math.random() * 9000)}`);
    setStartedAt(Date.now());
    setMttr(0);
    setStep(0);
  };
  const close = () => setStep(-1);
  const resolved = step === STEPS.length - 1;
  const active = step >= 0 && !resolved;

  return (
    <Ctx.Provider value={{ step, active, resolved, start, close, startedAt, mttr, id, stepMs: STEP_MS }}>
      {children}
    </Ctx.Provider>
  );
};

export const useIncident = () => useContext(Ctx);

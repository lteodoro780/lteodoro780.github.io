import { Throughput, Resources, LogTail, Heatmap, Tile } from "../../noc/Widgets";
import { useJitter } from "../../../lib/live";

export const TelemetriaApp = () => {
  const p99 = useJitter(48, 8, 1400);
  const pods = useJitter(24, 2, 3000);
  const err = useJitter(0.04, 0.02, 1700, 2);
  return (
    <div data-testid="app-telemetria" className="grid grid-cols-1 gap-4 md:grid-cols-12">
      <p className="md:col-span-12 border border-amber-500/50 bg-noc-panel p-3 font-mono text-xs text-amber-300">SIMULAÇÃO DE NOC — valores, logs e gráficos sintéticos. Não representam monitoramento real nem indicadores profissionais.</p>
      <div className="contents-grid md:col-span-12"><Throughput /></div>
      <div className="contents-grid md:col-span-5"><Resources /></div>
      <div className="contents-grid md:col-span-7"><LogTail /></div>
      <div className="grid grid-cols-2 gap-4 md:col-span-12 md:grid-cols-4">
        <Tile testid="tile-p99" label="Latência p99 (DEMO)" value={p99} unit="ms" delta="▼ estável" />
        <Tile testid="tile-error-rate" label="Taxa de erro (DEMO)" value={err} unit="%" delta="▼ abaixo do SLO" />
        <Tile testid="tile-pods" label="Pods (DEMO)" value={pods} unit="/24" delta="● saudável" />
        <Tile testid="tile-deploys" label="Deploys (DEMO)" value="12" unit="" delta="▲ cadência alta" />
      </div>
      <div className="contents-grid md:col-span-12"><Heatmap /></div>
    </div>
  );
};

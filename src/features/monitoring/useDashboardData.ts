import { useStore } from 'zustand';
import { createMonitorStore } from '../../stores/monitorStore';
export const monitorStore = createMonitorStore();
/** Display accepted provider data only; connection loss never becomes a zero reading. */
export function useDashboardData() {
  const sample = useStore(monitorStore, (s) => s.latestTelemetry);
  const connection = useStore(monitorStore, (s) => s.connection);
  const current = connection === 'connected' ? sample : null;
  return {
    simulation: current?.source === 'simulation',
    telemetry: current?.data ?? null,
    connection,
  };
}

import { createStore } from 'zustand/vanilla';
import type { ConnectionStatus, TelemetrySample } from '../models/telemetry';
import type {
  TelemetryEvent,
  TelemetryProvider,
} from '../services/telemetry/TelemetryProvider';
interface MonitorState {
  connection: ConnectionStatus;
  latestTelemetry: TelemetrySample | null;
  error: string | null;
  accept: (event: TelemetryEvent) => void;
  reset: () => void;
}
const initial = {
  connection: 'disconnected' as const,
  latestTelemetry: null,
  error: null,
};
export const createMonitorStore = () =>
  createStore<MonitorState>()((set) => ({
    ...initial,
    accept: (event) => {
      if (event.type === 'sample')
        set({ latestTelemetry: event.sample, error: null });
      else if (event.type === 'error') set({ error: event.message });
      else
        set({
          connection: event.status,
          ...(event.status === 'disconnected' ? { latestTelemetry: null } : {}),
        });
    },
    reset: () => set(initial),
  }));
/** Composition boundary shared by mock, BLE and Wi-Fi implementations. */
export function bindTelemetry(
  provider: TelemetryProvider,
  store: ReturnType<typeof createMonitorStore>,
) {
  store.getState().reset();
  store.getState().accept({ type: 'connection', status: provider.getStatus() });
  return provider.subscribe(store.getState().accept);
}

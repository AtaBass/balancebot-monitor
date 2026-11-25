import { strings as t } from '../../i18n';
import {
  isRobotTelemetry,
  type ConnectionStatus,
} from '../../models/telemetry';
import type { TelemetryEvent, TelemetryProvider } from './TelemetryProvider';
/** Manual fixture adapter only: no timer, generated values, or hardware access. */
export class MockTelemetryProvider implements TelemetryProvider {
  readonly source = 'simulation' as const;
  private status: ConnectionStatus = 'disconnected';
  private disposed = false;
  private listeners = new Set<(event: TelemetryEvent) => void>();
  constructor(private readonly now: () => number = () => performance.now()) {}
  getStatus() {
    return this.status;
  }
  subscribe(listener: (event: TelemetryEvent) => void) {
    this.assertActive();
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  async connect() {
    this.assertActive();
    if (this.status === 'connected') return;
    this.setStatus('connecting');
    this.setStatus('connected');
  }
  async disconnect() {
    if (this.disposed || this.status === 'disconnected') return;
    this.setStatus('disconnected');
  }
  push(value: unknown) {
    this.assertActive();
    if (this.status !== 'connected') throw new Error(t.errors.connectFirst);
    if (!isRobotTelemetry(value)) {
      this.emit({
        type: 'error',
        code: 'INVALID_TELEMETRY',
        message: t.errors.invalidTelemetry,
        recoverable: true,
      });
      return;
    }
    this.emit({
      type: 'sample',
      sample: {
        data: { ...value },
        source: this.source,
        receivedAtMs: this.now(),
      },
    });
  }
  async dispose() {
    await this.disconnect();
    this.listeners.clear();
    this.disposed = true;
  }
  private assertActive() {
    if (this.disposed) throw new Error(t.errors.disposed);
  }
  private setStatus(status: ConnectionStatus) {
    this.status = status;
    this.emit({ type: 'connection', status });
  }
  private emit(event: TelemetryEvent) {
    this.listeners.forEach((listener) => listener(event));
  }
}

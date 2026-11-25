import type {
  ConnectionStatus,
  TelemetrySample,
  TelemetrySource,
} from '../../models/telemetry';
export type TelemetryEvent =
  | { readonly type: 'connection'; readonly status: ConnectionStatus }
  | { readonly type: 'sample'; readonly sample: TelemetrySample }
  | {
      readonly type: 'error';
      readonly code: string;
      readonly message: string;
      readonly recoverable: boolean;
    };
export interface TelemetryProvider {
  readonly source: TelemetrySource;
  getStatus(): ConnectionStatus;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  /** Subscribe before connecting. Events are not replayed. Unsubscribe is idempotent. */
  subscribe(listener: (event: TelemetryEvent) => void): () => void;
  /** Terminal cleanup; an instance cannot be reused afterward. */
  dispose(): Promise<void>;
}

/** Unix epoch milliseconds at the robot; clock synchronization is TBD. */
export interface RobotTelemetry {
  readonly timestamp: number;
  readonly tiltAngleDeg: number;
  readonly charging: boolean;
  readonly batteryLevelPercent?: number;
}
export type ConnectionStatus =
  'disconnected' | 'connecting' | 'connected' | 'reconnecting' | 'error';
export type TelemetrySource = 'simulation' | 'ble' | 'wifi';
export interface TelemetrySample {
  readonly data: RobotTelemetry;
  readonly source: TelemetrySource;
  /** Phone monotonic clock, never the robot timestamp. */
  readonly receivedAtMs: number;
}
export const TELEMETRY_INTERVAL_MS = 1000;
export const INTERRUPTION_THRESHOLD_MS = 2000;
export function isRobotTelemetry(value: unknown): value is RobotTelemetry {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.timestamp === 'number' &&
    Number.isFinite(v.timestamp) &&
    v.timestamp >= 0 &&
    typeof v.tiltAngleDeg === 'number' &&
    Number.isFinite(v.tiltAngleDeg) &&
    typeof v.charging === 'boolean' &&
    (v.batteryLevelPercent === undefined ||
      (typeof v.batteryLevelPercent === 'number' &&
        Number.isFinite(v.batteryLevelPercent) &&
        v.batteryLevelPercent >= 0 &&
        v.batteryLevelPercent <= 100))
  );
}
export type TelemetryFreshness = 'awaiting' | 'fresh' | 'interrupted';
/** Anchor to connection time until the first valid sample. Exactly 2 s is not >2 s. */
export function telemetryFreshness(
  nowMs: number,
  connectedAtMs: number,
  lastReceivedAtMs: number | null,
): TelemetryFreshness {
  if (nowMs - (lastReceivedAtMs ?? connectedAtMs) > INTERRUPTION_THRESHOLD_MS)
    return 'interrupted';
  return lastReceivedAtMs === null ? 'awaiting' : 'fresh';
}

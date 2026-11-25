import type { MotionState } from '../../models/tracking';
/** Derived presentation props, not a second source of telemetry truth. */
export interface RobotVisualizationState {
  readonly tiltAngleDeg: number | null;
  readonly yawRad: number | null;
  readonly motion: MotionState;
  readonly charging: boolean | null;
  readonly stale: boolean;
}

export type MotionState =
  | 'stationary'
  | 'moving-forward'
  | 'moving-backward'
  | 'turning-left'
  | 'turning-right'
  | 'rebalancing'
  | 'unknown';
export type DataValidity =
  | { readonly valid: true }
  | { readonly valid: false; readonly reasons: readonly string[] };
interface PoseBase {
  readonly timestamp: number;
  readonly confidence: number; // normalized [0, 1]
  readonly validity: DataValidity;
}
export type RobotPose = PoseBase &
  (
    | {
        readonly coordinateSystem: 'image';
        readonly position: { readonly xPx: number; readonly yPx: number };
        readonly orientationRad: number | null;
      }
    | {
        readonly coordinateSystem: 'world';
        readonly position: {
          readonly xM: number;
          readonly yM: number;
          readonly zM: number;
        };
        readonly yawRad: number | null;
        readonly calibrationId: string;
        readonly frameId: string;
      }
  );
export interface TravelEstimate {
  readonly distanceM: number;
  readonly displacementM: number;
  readonly calibrationId: string;
  readonly validity: DataValidity;
}
export interface TrackingObservation {
  readonly source: 'camera';
  readonly pose: RobotPose | null;
  readonly motion: MotionState;
  readonly timestamp: number;
  readonly validity: DataValidity;
}

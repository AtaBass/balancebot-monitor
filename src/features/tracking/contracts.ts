import type { TrackingObservation } from '../../models/tracking';
/** Implement with native camera processing later; never a Python runtime assumption. */
export interface TrackingProvider {
  start(): Promise<void>;
  stop(): Promise<void>;
  subscribe(listener: (observation: TrackingObservation) => void): () => void;
}

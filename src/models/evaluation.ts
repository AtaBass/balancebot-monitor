import type { DataValidity } from './tracking';
export type EvaluationTask =
  'static-balance' | 'robot-guidance' | 'charging' | 'integrated-task';
export type TestLifecycle =
  'idle' | 'preparing' | 'running' | 'finalizing' | 'finalized' | 'aborted';
export interface EvidenceMetadata {
  readonly id: string;
  readonly kind: 'video' | 'image' | 'timestamped-event';
  readonly capturedAt: number;
  readonly localUri?: string;
  readonly sha256?: string;
}
export interface EvaluationMeasurement {
  readonly key: string;
  readonly value: number | boolean | null;
  readonly unit: 'deg' | 'rad' | 'm' | 'ms' | 'percent' | 'boolean';
  readonly source: 'telemetry' | 'camera' | 'clock';
  readonly timestamp: number;
  readonly validity: DataValidity;
}
/** Finalized, append-only record contract. Runtime/storage enforcement arrives in Stage 7. */
export interface EvaluationResult {
  readonly schemaVersion: 1;
  readonly id: string;
  readonly task: EvaluationTask;
  readonly mode: 'simulation' | 'real';
  readonly rulesetVersion: string;
  readonly startedAt: number;
  readonly endedAt: number;
  readonly durationMs: number;
  readonly measurements: readonly EvaluationMeasurement[];
  readonly decision:
    | { readonly outcome: 'passed'; readonly failureReasons: readonly [] }
    | {
        readonly outcome: 'failed' | 'inconclusive';
        readonly failureReasons: readonly [string, ...string[]];
      };
  readonly evidence: readonly EvidenceMetadata[];
  readonly validity: DataValidity;
  readonly createdAt: number;
}

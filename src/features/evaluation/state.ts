import type { EvaluationTask, TestLifecycle } from '../../models/evaluation';
/** Feature-owned state shape; no runnable evaluation engine in Stage 1. */
export interface EvaluationSessionState {
  readonly selectedTask: EvaluationTask | null;
  readonly lifecycle: TestLifecycle;
  readonly sessionId: string | null;
}

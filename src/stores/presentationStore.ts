import { create } from 'zustand';
import type { EvaluationTask } from '../models/evaluation';
interface PresentationState {
  selectedTask: EvaluationTask | null;
  selectTask: (value: EvaluationTask | null) => void;
}
/** Session-only task selection, not a running evaluation. */
export const usePresentationStore = create<PresentationState>((set) => ({
  selectedTask: null,
  selectTask: (selectedTask) => set({ selectedTask }),
}));

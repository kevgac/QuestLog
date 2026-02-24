export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export interface Quest {
  id: string;
  title: string;
  difficulty: QuestDifficulty;
  createdAt: number;     // timestamp
  doneAt?: number | null; // timestamp si terminée
}
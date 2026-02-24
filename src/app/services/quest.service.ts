import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Quest, QuestDifficulty } from '../models/quest.model';

@Injectable({ providedIn: 'root' })
export class QuestService {
  private readonly _quests$ = new BehaviorSubject<Quest[]>([
    {
      id: crypto.randomUUID(),
      title: 'Boire un grand verre d’eau',
      difficulty: 'easy',
      createdAt: Date.now(),
      doneAt: null,
    },
    {
      id: crypto.randomUUID(),
      title: 'Faire 15 minutes de marche',
      difficulty: 'medium',
      createdAt: Date.now(),
      doneAt: null,
    },
    {
      id: crypto.randomUUID(),
      title: 'Coder 25 minutes (pomodoro)',
      difficulty: 'hard',
      createdAt: Date.now(),
      doneAt: null,
    },
  ]);

  private readonly _xp$ = new BehaviorSubject<number>(0);

  readonly quests$ = this._quests$.asObservable();
  readonly xp$ = this._xp$.asObservable();

  readonly level$ = this.xp$.pipe(
    map(xp => Math.floor(xp / 100) + 1)
  );

  readonly activeQuests$ = this.quests$.pipe(
    map(list => list.filter(q => !q.doneAt))
  );

  readonly doneQuests$ = this.quests$.pipe(
    map(list => list.filter(q => !!q.doneAt))
  );

  addQuest(title: string, difficulty: QuestDifficulty): void {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      title: title.trim(),
      difficulty,
      createdAt: Date.now(),
      doneAt: null,
    };

    this._quests$.next([newQuest, ...this._quests$.value]);
  }

  markDone(id: string): void {
    const quest = this._quests$.value.find(q => q.id === id);
    if (!quest || quest.doneAt) return;

    const xpEarned = this.getXpForDifficulty(quest.difficulty);
    this._xp$.next(this._xp$.value + xpEarned);

    const updated = this._quests$.value.map(q =>
      q.id === id ? { ...q, doneAt: Date.now() } : q
    );

    this._quests$.next(updated);
  }

  remove(id: string): void {
    this._quests$.next(this._quests$.value.filter(q => q.id !== id));
  }

  private getXpForDifficulty(difficulty: QuestDifficulty): number {
    switch (difficulty) {
      case 'easy': return 10;
      case 'medium': return 25;
      case 'hard': return 50;
    }
  }
}
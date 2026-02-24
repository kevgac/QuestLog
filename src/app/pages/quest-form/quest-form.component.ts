import { Component, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

import { QuestDifficulty } from '../../models/quest.model';
import { QuestService } from '../../services/quest.service';

@Component({
  selector: 'app-quest-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './quest-form.component.html',
  styleUrl: './quest-form.component.scss'
})
export class QuestFormComponent {
  // (pour plus tard) : si on est en mode edit /quests/:id/edit
  readonly mode = signal<'create' | 'edit'>('create');

  readonly difficulties: { label: string; value: QuestDifficulty }[] = [
    { label: 'Facile', value: 'easy' },
    { label: 'Moyen', value: 'medium' },
    { label: 'Difficile', value: 'hard' },
  ];

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    difficulty: ['easy' as QuestDifficulty, [Validators.required]],
  });

  readonly titleError = computed(() => {
    const c = this.form.controls.title;
    if (!c.touched && !c.dirty) return null;
    if (c.hasError('required')) return 'Le titre est obligatoire.';
    if (c.hasError('minlength')) return 'Minimum 3 caractères.';
    if (c.hasError('maxlength')) return 'Maximum 60 caractères.';
    return null;
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly questService: QuestService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    // On prépare déjà le mode edit pour la suite
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.mode.set('edit');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, difficulty } = this.form.getRawValue();

    // pour l’instant, on ne gère que "create"
    this.questService.addQuest(title, difficulty);
    this.router.navigateByUrl('/quests');
  }
}
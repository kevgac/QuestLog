import { Component } from '@angular/core';
import { AsyncPipe, NgClass, DatePipe } from '@angular/common';
import { QuestService } from '../../services/quest.service';

@Component({
  selector: 'app-quests',
  standalone: true,
  imports: [AsyncPipe, NgClass, DatePipe],
  templateUrl: './quests.component.html',
  styleUrl: './quests.component.scss'
})
export class QuestsComponent {
  readonly active$ = this.questService.activeQuests$;
  readonly done$ = this.questService.doneQuests$;

  constructor(private readonly questService: QuestService) {}

  done(id: string) {
    this.questService.markDone(id);
  }

  remove(id: string) {
    this.questService.remove(id);
  }
}
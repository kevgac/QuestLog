import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuestService } from '../../services/quest.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly xp$ = this.questService.xp$;
  readonly level$ = this.questService.level$;

  constructor(private readonly questService: QuestService) {}
}
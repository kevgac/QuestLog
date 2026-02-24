import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { QuestsComponent } from './pages/quests/quests.component';
import { QuestFormComponent } from './pages/quest-form/quest-form.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'quests', component: QuestsComponent },

  // create + edit (même écran)
  { path: 'quests/new', component: QuestFormComponent },
  { path: 'quests/:id/edit', component: QuestFormComponent },

  { path: 'profile', component: ProfileComponent },

  // 404 -> revient au dashboard
  { path: '**', redirectTo: 'dashboard' },
];
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PlayerListComponent } from "./player/player-list/player-list.component";
import { PlayerFullComponent } from "./player/player-full/player-full.component";
import { PlayerFormComponent } from "./player/player-form/player-form.component";

import { ClubListComponent } from "./club/club-list/club-list.component";
import { ClubFullComponent } from './club/club-full/club-full.component';
import { ClubFormComponent } from './club/club-form/club-form.component';
import { ClubAdminListComponent } from './club/club-admin-list/club-admin-list.component';

import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentFullComponent } from './tournament/tournament-full/tournament-full.component';
import { TournamentFormComponent } from './tournament/tournament-form/tournament-form.component';

import { LoginFormComponent } from './authorization/login-form/login-form.component';
import { TestingGroundsComponent } from './testing-grounds/testing-grounds.component';
import { FightFullComponent } from './fight/fight-full/fight-full.component';
import { TeamFightFullComponent } from './team-fight/team-fight-full/team-fight-full.component';
import { TeamFullComponent } from './team/team-full/team-full.component';
import { TournamentTeamListComponent } from './tournament/tournament-team-list/tournament-team-list.component';
import { GroupFullComponent } from './group/group-full/group-full.component';
import { GroupPhaseFullComponent } from './group-phase/group-phase-full/group-phase-full.component';
import { TournamentParticipationListComponent } from './tournament-participation/tournament-participation-list/tournament-participation-list.component';
import { TournamentAdminListComponent } from './tournament-admin/tournament-admin-list/tournament-admin-list.component';
import { UserRegistrationFormComponent } from './user-registration/user-registration-form/user-registration-form.component';
import { CupPhaseFullComponent } from './cup-phase/cup-phase-full/cup-phase-full.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player/new', component: PlayerFormComponent },
  { path: 'player/:id/edit', component: PlayerFormComponent },
  { path: 'player/:id', component: PlayerFullComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'club/new', component: ClubFormComponent },
  { path: 'club/:id/edit', component: ClubFormComponent },
  { path: 'club/:id/admin', component: ClubAdminListComponent },
  { path: 'club/:id', component: ClubFullComponent },
  { path: 'clubs', component: ClubListComponent },
  { path: 'tournament/new', component: TournamentFormComponent },
  { path: 'tournament/:id/edit', component: TournamentFormComponent },
  { path: 'tournament/:id/participation', component: TournamentParticipationListComponent },
  { path: 'tournament/:id/admin', component: TournamentAdminListComponent },
  { path: 'tournament/:id/teams', component: TournamentTeamListComponent },
  { path: 'tournament/:id', component: TournamentFullComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'fights/:id', component: FightFullComponent },
  { path: 'team-fights/:id', component: TeamFightFullComponent },
  { path: 'teams/:id', component: TeamFullComponent },
  { path: 'groups/:id', component: GroupFullComponent },
  { path: 'group-phases/:id', component: GroupPhaseFullComponent },
  { path: 'registration', component: UserRegistrationFormComponent },
  { path: 'cup-phases/:id', component: CupPhaseFullComponent },
  { path: 'test', component: TestingGroundsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

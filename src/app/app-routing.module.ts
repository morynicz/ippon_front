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

import { TournamentParticipationListComponent } from './tournament/tournament-participation-list/tournament-participation-list.component';
import { TournamentAdminListComponent } from './tournament/tournament-admin-list/tournament-admin-list.component';

import { LoginFormComponent } from './authorization/login-form/login-form.component';
import { TestingGroundsComponent } from './testing-grounds/testing-grounds.component';


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
  { path: 'tournament/:id', component: TournamentFullComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'test', component: TestingGroundsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

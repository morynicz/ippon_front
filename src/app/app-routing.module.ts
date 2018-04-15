import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PlayerListComponent } from "./player/player-list/player-list.component";
import { PlayerFullComponent } from "./player/player-full/player-full.component";
import { PlayerFormComponent } from "./player/player-form/player-form.component";

import { ClubListComponent } from "./club/club-list/club-list.component";
import { ClubFullComponent } from './club/club-full/club-full.component';
import { ClubFormComponent } from './club/club-form/club-form.component';

import { LoginFormComponent } from './authorization/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player/new', component: PlayerFormComponent },
  { path: 'player/:id/edit', component: PlayerFormComponent },
  { path: 'player/:id', component: PlayerFullComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'club/new', component: ClubFormComponent },
  { path: 'club/:id/edit', component: ClubFormComponent },
  { path: 'club/:id', component: ClubFullComponent },
  { path: 'clubs', component: ClubListComponent },
  { path: 'login', component: LoginFormComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PlayersComponent } from "./player/players/players.component";
import { PlayerFullComponent } from "./player/player-full/player-full.component"
import { PlayerFormComponent } from "./player/player-form/player-form.component";

import { ClubsComponent } from "./club/clubs/clubs.component"
import { ClubFullComponent } from './club/club-full/club-full.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player/:id/edit', component: PlayerFormComponent },
  { path: 'player/:id', component: PlayerFullComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'club/:id', component: ClubFullComponent },
  { path: 'clubs', component: ClubsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

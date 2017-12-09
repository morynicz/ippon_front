import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { PlayerService } from "./player/player.service";
import { PlayersComponent } from './player/players/players.component';
import { PlayerFullComponent } from './player/player-full/player-full.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { PlayerLineComponent } from './player/player-line/player-line.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerFullComponent,
    PlayersComponent,
    PlayerFormComponent,
    PlayerLineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

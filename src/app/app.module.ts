import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PlayerFullComponent } from './player/player-full/player-full.component';
import { PlayersComponent } from './player/players/players.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerFullComponent,
    PlayersComponent,
    PlayerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

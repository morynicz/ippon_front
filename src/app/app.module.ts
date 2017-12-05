import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule, MatCheckboxModule, MatRadioModule} from '@angular/material';


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
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

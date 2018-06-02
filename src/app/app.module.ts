import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ClubService } from './club/club.service';
import { PlayerService } from "./player/player.service";
import { PlayerListComponent } from './player/player-list/player-list.component';
import { PlayerFullComponent } from './player/player-full/player-full.component';
import { PlayerFormComponent } from './player/player-form/player-form.component';
import { PlayerLineComponent } from './player/player-line/player-line.component';
import { ClubFullComponent } from './club/club-full/club-full.component';
import { ClubListComponent } from './club/club-list/club-list.component';
import { ClubLineComponent } from './club/club-line/club-line.component';
import { ClubFormComponent } from './club/club-form/club-form.component';
import { LoginFormComponent } from './authorization/login-form/login-form.component';
import { AuthenticationService } from './authorization/authentication.service';
import { AuthenticationInterceptor } from './authorization/authentication-interceptor';
import { JwtHelperWrapperService } from './authorization/jwt-helper-wrapper.service';
import { TokenStorageService } from "./authorization/token-storage.service";
import { AuthorizationService } from './authorization/authorization.service';
import { KendoRankPipe } from './player/kendo-rank.pipe';
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentLineComponent } from './tournament/tournament-line/tournament-line.component';
import { TournamentService } from './tournament/tournament.service';
import { TournamentFullComponent } from './tournament/tournament-full/tournament-full.component';
import { NumericConstraintPipe } from './tournament/numeric-constraint.pipe';
import { SexConstraintPipe } from './tournament/sex-constraint.pipe';
import { TournamentFormComponent } from './tournament/tournament-form/tournament-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    PlayerFullComponent,
    PlayerListComponent,
    PlayerFormComponent,
    PlayerLineComponent,
    NavbarComponent,
    HomeComponent,
    ClubFullComponent,
    ClubListComponent,
    ClubLineComponent,
    ClubFormComponent,
    LoginFormComponent,
    KendoRankPipe,
    TournamentListComponent,
    TournamentLineComponent,
    TournamentFullComponent,
    NumericConstraintPipe,
    SexConstraintPipe,
    TournamentFormComponent,
  ],
  providers: [
    PlayerService,
    ClubService,
    TournamentService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    JwtHelperWrapperService,
    TokenStorageService,
    AuthorizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

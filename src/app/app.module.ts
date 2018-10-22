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
import { ClubAdminService } from './club/club-admin.service';
import { ClubAdminFormComponent } from './club/club-admin-form/club-admin-form.component';
import { ClubAdminListComponent } from './club/club-admin-list/club-admin-list.component';
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
import { TournamentParticipationFormComponent } from './tournament/tournament-participation-form/tournament-participation-form.component';
import { TournamentParticipationListComponent } from './tournament/tournament-participation-list/tournament-participation-list.component';
import { TournamentAdminFormComponent } from './tournament/tournament-admin-form/tournament-admin-form.component';
import { TournamentParticipantService } from './tournament/tournament-participant.service';
import { TournamentAdminListComponent } from './tournament/tournament-admin-list/tournament-admin-list.component';
import { TournamentAdminService } from './tournament/tournament-admin.service';
import { PointFormComponent } from './point/point-form/point-form.component';
import { PointService } from './point/point.service';
import { FightFullComponent } from './fight/fight-full/fight-full.component';
import { PointTypePipe } from './point/point-type.pipe';
import { PointLineComponent } from './point/point-line/point-line.component';
import { TestingGroundsComponent } from './testing-grounds/testing-grounds.component';
import { FightService } from './fight/fight.service';
import { FightFormComponent } from './fight/fight-form/fight-form.component';
import { FightLineComponent } from './fight/fight-line/fight-line.component';
import { TeamFightFullComponent } from './team-fight/team-fight-full/team-fight-full.component';
import { TeamFightService } from './team-fight/team-fight.service';
import { TeamService } from './team/team.service';
import { TeamMemberService } from './team/team-member.service';
import { TeamLineComponent } from './team/team-line/team-line.component';
import { TeamFormComponent } from './team/team-form/team-form.component';
import { TeamFullComponent } from './team/team-full/team-full.component';
import { TournamentTeamListComponent } from './tournament/tournament-team-list/tournament-team-list.component';

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
    ClubAdminListComponent,
    ClubAdminFormComponent,
    LoginFormComponent,
    KendoRankPipe,
    TournamentListComponent,
    TournamentLineComponent,
    TournamentFullComponent,
    NumericConstraintPipe,
    SexConstraintPipe,
    TournamentFormComponent,
    TournamentParticipationFormComponent,
    TournamentParticipationListComponent,
    TournamentAdminFormComponent,
    TournamentAdminListComponent,
    PointFormComponent,
    FightFullComponent,
    PointTypePipe,
    PointLineComponent,
    TestingGroundsComponent,
    FightFormComponent,
    FightLineComponent,
    TeamFightFullComponent,
    TeamLineComponent,
    TeamFormComponent,
    TeamFullComponent,
    TournamentTeamListComponent
  ],
  providers: [
    PlayerService,
    ClubService,
    ClubAdminService,
    TournamentService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    JwtHelperWrapperService,
    TokenStorageService,
    AuthorizationService,
    TournamentParticipantService,
    TournamentAdminService,
    PointService,
    FightService,
    TeamFightService,
    TeamService,
    TeamMemberService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

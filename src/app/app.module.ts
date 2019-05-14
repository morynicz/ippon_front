import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


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
import { KendoRankPipe } from './player/kendo-rank.pipe';
import { TournamentListComponent } from './tournament/tournament-list/tournament-list.component';
import { TournamentLineComponent } from './tournament/tournament-line/tournament-line.component';
import { TournamentService } from './tournament/tournament.service';
import { TournamentFullComponent } from './tournament/tournament-full/tournament-full.component';
import { NumericConstraintPipe } from './tournament/numeric-constraint.pipe';
import { SexConstraintPipe } from './tournament/sex-constraint.pipe';
import { TournamentFormComponent } from './tournament/tournament-form/tournament-form.component';
import { TournamentParticipantService } from './tournament-participation/tournament-participant.service';
import { TournamentAdminService } from './tournament-admin/tournament-admin.service';
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
import { GroupPhaseLineComponent } from './group-phase/group-phase-line/group-phase-line.component';
import { GroupPhaseFullComponent } from './group-phase/group-phase-full/group-phase-full.component';
import { TeamFightFormComponent } from './team-fight/team-fight-form/team-fight-form.component';
import { GroupFullComponent } from './group/group-full/group-full.component';
import { TeamFightLineComponent } from './team-fight/team-fight-line/team-fight-line.component';
import { GroupFightLineComponent } from './group-fight/group-fight-line/group-fight-line.component';
import { GroupFightFormComponent } from './group-fight/group-fight-form/group-fight-form.component';
import { GroupMemberService } from './group-member/group-member.service';
import { GroupService } from './group/group.service';
import { GroupFightService } from './group-fight/group-fight.service';
import { GroupMemberLineComponent } from './group-member/group-member-line/group-member-line.component';
import { GroupMemberFormComponent } from './group-member/group-member-form/group-member-form.component';
import { GroupLineComponent } from './group/group-line/group-line.component';
import { GroupFormComponent } from './group/group-form/group-form.component';
import { GroupPhaseService } from './group-phase/group-phase.service';
import { GroupPhaseFormComponent } from './group-phase/group-phase-form/group-phase-form.component';
import { TournamentAdminFormComponent } from './tournament-admin/tournament-admin-form/tournament-admin-form.component';
import { TournamentAdminListComponent } from './tournament-admin/tournament-admin-list/tournament-admin-list.component';
import { TournamentParticipationFormComponent } from './tournament-participation/tournament-participation-form/tournament-participation-form.component';
import { TournamentParticipationListComponent } from './tournament-participation/tournament-participation-list/tournament-participation-list.component';
import { UserRegistrationFormComponent } from './user-registration/user-registration-form/user-registration-form.component';
import { UserRegistrationService } from './user-registration/user-registration.service';
import { DeepPlayerService } from './player/deep-player.service';
import { CupPhaseLineComponent } from './cup-phase/cup-phase-line/cup-phase-line.component';


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
    TournamentTeamListComponent,
    GroupPhaseLineComponent,
    GroupPhaseFullComponent,
    TeamFightFormComponent,
    GroupFullComponent,
    TeamFightLineComponent,
    GroupFightLineComponent,
    GroupFightFormComponent,
    GroupMemberLineComponent,
    GroupMemberFormComponent,
    GroupLineComponent,
    GroupFormComponent,
    GroupPhaseFormComponent,
    UserRegistrationFormComponent,
    CupPhaseLineComponent
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
    TournamentParticipantService,
    TournamentAdminService,
    PointService,
    FightService,
    TeamFightService,
    TeamService,
    TeamMemberService,
    GroupMemberService,
    GroupService,
    GroupFightService,
    GroupPhaseService,
    UserRegistrationService,
    DeepPlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

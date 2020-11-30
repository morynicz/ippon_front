import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TournamentTeamListComponent } from './tournament-team-list.component';
import { TeamLineComponent } from '../../team/team-line/team-line.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TeamFormComponent } from '../../team/team-form/team-form.component';
import { TournamentServiceSpy } from '../tournament.service.spy';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';
import { NumericConstraint } from '../numeric-constraint';
import { Rank } from '../../rank';
import { SexConstraint } from '../sex-constraint';
import { By } from '@angular/platform-browser';
import { TeamMemberServiceSpy } from '../../team/team-member.service.spy';
import { TeamMemberService } from '../../team/team-member.service';
import { Player } from '../../player/player';
import { TournamentParticipantServiceSpy } from '../../tournament-participation/tournament-participant.service.spy';
import { TournamentParticipantService } from '../../tournament-participation/tournament-participant.service';
import { TeamMember } from '../../team/team-member';
import { Observable } from 'rxjs';

const tournamentId: number = 4;
const teams: Team[] = [
  {
    id: 0,
    name: "T0",
    members: [],
    tournament: tournamentId
  }, {
    id: 1,
    name: "T1",
    members: [],
    tournament: tournamentId
  }, {
    id: 2,
    name: "T2",
    members: [],
    tournament: tournamentId
  }
]

const tournament: Tournament = {
  id: 7,
  name: "T1",
  date: new Date("2020-01-01"),
  city: "Ci1",
  address: "A1",
  team_size: 3,
  group_match_length: 3,
  ko_match_length: 4,
  final_match_length: 5,
  finals_depth: 2,
  age_constraint: NumericConstraint.None,
  age_constraint_value: 0,
  rank_constraint: NumericConstraint.None,
  rank_constraint_value: Rank.Kyu_5,
  sex_constraint: SexConstraint.None,
  description: "d1",
  webpage: "w1"
};

const players: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 0
},
{
  name: 'P2',
  surname: 'S2',
  id: 1
}];


class TeamMemberServiceSpyWithObservableControl extends TeamMemberServiceSpy {
  addObservableSubscribedFor: TeamMember[] = [];
  add(resource: TeamMember): Observable<void> {
    this.addValues.push(resource);
    return new Observable<void>(observer => {
      this.addObservableSubscribedFor.push(resource);
      observer.next();
      observer.complete();
    });
  }
}

describe('TournamentTeamListComponent', () => {
  let component: TournamentTeamListComponent;
  let fixture: ComponentFixture<TournamentTeamListComponent>;
  let teamService: TeamServiceSpy;
  let tournamentService: TournamentServiceSpy;
  let teamMemberService: TeamMemberServiceSpyWithObservableControl;
  let tournamentParticipantService: TournamentParticipantServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    teamService = new TeamServiceSpy();
    teamService.getListReturnValues.push(teams);
    teamService.isAuthorizedReturnValue = false;
    tournamentService = new TournamentServiceSpy();
    teamMemberService = new TeamMemberServiceSpyWithObservableControl();
    tournamentParticipantService = new TournamentParticipantServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        TournamentTeamListComponent,
        TeamLineComponent,
        TeamFormComponent
      ],
      providers: [
        {
          provide: TeamService,
          useValue: teamService
        },
        {
          provide: TournamentService,
          useValue: tournamentService
        },
        {
          provide: TeamMemberService,
          useValue: teamMemberService
        },
        {
          provide: TournamentParticipantService,
          useValue: tournamentParticipantService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: tournamentId })
            }
          }
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  describe("when user is not authorized", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentTeamListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('shows names of teams of this tournament', () => {
      expect(html.textContent).toContain(teams[0].name);
      expect(html.textContent).toContain(teams[1].name);
      expect(html.textContent).toContain(teams[2].name);
    });

    it("should retrieve teams from teams api with tournament id", () => {
      expect(teamService.getListValues).toEqual([tournamentId]);
    });

    it("should not show form for adding new teams", () => {
      expect(html.querySelector('#add-team-form')).toBeFalsy();
    });
  });

  describe("when user is authorized and team size is grater than one", () => {
    beforeEach(() => {
      tournamentService.isStaffReturnValue = true;
      teamService.isAuthorizedReturnValue = false;
      tournamentService.getReturnValues.push(tournament);
      fixture = TestBed.createComponent(TournamentTeamListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should show form for adding new teams", () => {
      expect(html.querySelector('#add-team-form')).toBeTruthy();
    });

    describe("when reloadTeams() method is called", () => {
      beforeEach(() => {
        component.reload();
      });
      it("loads teams again", () => {
        expect(teamService.getListValues.length).toBe(2);
        expect(teamService.getListValues[1]).toBe(tournamentId);
      });
    });

    it("doesn't show show button for generating teams", () => {
      expect(fixture.debugElement.query(By.css("#generate-teams"))).toBeFalsy();
    });
  });
  describe("when user is authorized and team size is exactly one", () => {
    beforeEach(() => {
      tournamentService.isStaffReturnValue = true;
      teamService.isAuthorizedReturnValue = false;
      let onePlayerTournament = { ...tournament };
      onePlayerTournament.team_size = 1;
      tournamentService.getReturnValues.push(onePlayerTournament);
      fixture = TestBed.createComponent(TournamentTeamListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("shows button for generating teams based on players not assigned to any team", () => {
      expect(fixture.debugElement.query(By.css("#generate-teams"))).toBeTruthy();
    });

    describe("when generate teams button is pressed", () => {
      beforeEach(() => {
        tournamentParticipantService.getNotAssignedReturnValues.push(players);
        teamService.addReturnValues = [
          { id: 5, tournament: tournamentId, name: players[0].name + " " + players[0].surname, members: [] },
          { id: 9, tournament: tournamentId, name: players[1].name + " " + players[1].surname, members: [] }
        ]
        let btn = fixture.debugElement.query(By.css("#generate-teams")).nativeElement;
        btn.click();
      });

      it("should create teams for unassigned players", () => {
        expect(teamService.addValues).toContain({ id: 0, tournament: tournamentId, name: players[0].name + " " + players[0].surname, members: [] });
        expect(teamService.addValues).toContain({ id: 0, tournament: tournamentId, name: players[1].name + " " + players[1].surname, members: [] });
        expect(teamMemberService.addValues).toContain({ team: 5, player: players[0].id }, { team: 9, player: players[1].id });
        expect(teamMemberService.addObservableSubscribedFor).toContain({ team: 5, player: players[0].id }, { team: 9, player: players[1].id });
      });

      it("should reload teams", () => {
        expect(teamService.getListValues).toEqual([tournamentId, tournamentId])
      });
    });
  });


});

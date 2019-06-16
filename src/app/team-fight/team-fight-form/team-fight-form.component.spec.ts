import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFightFormComponent } from './team-fight-form.component';
import { TeamFightServiceSpy } from '../team-fight.service.spy';
import { TeamFightService } from '../team-fight.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Team } from '../../team/team';
import { TeamLineComponent } from '../../team/team-line/team-line.component';
import { TeamService } from '../../team/team.service';
import { TeamFight } from '../team-fight';
import { By } from '@angular/platform-browser';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';

const tournamentId: number = 32;
const teamFightId: number = 87;
const teams: Team[] = [
  {
    id: 22,
    name: "T1",
    members: [],
    tournament: tournamentId
  },
  {
    id: 27,
    name: "T2",
    members: [],
    tournament: tournamentId
  },
  {
    id: 27,
    name: "T2",
    members: [],
    tournament: tournamentId
  }
]

const teamFight: TeamFight = {
  aka_team: teams[0].id,
  shiro_team: teams[2].id,
  id: teamFightId,
  tournament: tournamentId,
  shiro_score: 0,
  aka_score: 0,
  status: FightStatus.Prepared,
  winner: FightWinner.None
}

describe('TeamFightFormComponent', () => {
  let component: TeamFightFormComponent;
  let fixture: ComponentFixture<TeamFightFormComponent>;
  let teamFightService: TeamFightServiceSpy;
  let reloadRequested: boolean;
  let createdTeamFight: TeamFight;
  let html;

  beforeEach(async(() => {
    teamFightService = new TeamFightServiceSpy();
    teamFightService.addReturnValue = teamFight;
    TestBed.configureTestingModule({
      declarations: [
        TeamFightFormComponent,
        TeamLineComponent
      ],
      providers: [
        { provide: TeamFightService, useValue: teamFightService },
        { provide: TeamService, useClass: TeamFightServiceSpy }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFightFormComponent);
    component = fixture.componentInstance;
    component.teams = teams;
    component.tournament = tournamentId;
    component.reloadRequest.subscribe(req => {
      reloadRequested = true;
      createdTeamFight = req;
    });
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;
  });

  it("should provide possibility to select any team from input", () => {
    expect(html).toContain(teams[0].name);
    expect(html).toContain(teams[1].name);
    expect(html).toContain(teams[2].name);
  });

  describe("when valid teams are selected and create button is pushed", () => {
    let btn;

    beforeEach(() => {
      btn = fixture.debugElement.query(By.css("#save-team-fight"));
      component.teamFight.aka_team = teams[0].id;
      component.teamFight.shiro_team = teams[2].id;

      btn.nativeElement.click();
    });

    it("should create teamFight between selected teams", () => {
      expect(teamFightService.addValue.aka_team).toEqual(teams[0].id);
      expect(teamFightService.addValue.shiro_team).toEqual(teams[2].id);
      expect(teamFightService.addValue.tournament).toEqual(tournamentId);
      expect(teamFightService.addValue.status).toEqual(FightStatus.Prepared);
      expect(teamFightService.addValue.winner).toEqual(FightWinner.None);
      expect(teamFightService.addValue.aka_score).toEqual(0);
      expect(teamFightService.addValue.shiro_score).toEqual(0);
    });

    it("should call reload callback with created team", () => {
      expect(reloadRequested).toBeTruthy();
      expect(createdTeamFight.aka_team).toEqual(teams[0].id);
      expect(createdTeamFight.shiro_team).toEqual(teams[2].id);
      expect(createdTeamFight.tournament).toEqual(tournamentId);
      expect(createdTeamFight.status).toEqual(FightStatus.Prepared);
      expect(createdTeamFight.winner).toEqual(FightWinner.None);
      expect(createdTeamFight.aka_score).toEqual(0);
      expect(createdTeamFight.shiro_score).toEqual(0);
      expect(createdTeamFight.id).toEqual(teamFightId);
    });
  });
});

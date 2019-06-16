import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFightFullComponent } from './team-fight-full.component';
import { TeamService } from '../../team/team.service';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { TeamFightServiceSpy } from '../team-fight.service.spy';
import { TeamFightService } from '../team-fight.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TeamFight } from '../team-fight';
import { Player } from '../../player/player';
import { Team } from '../../team/team';
import { FightService } from '../../fight/fight.service';
import { FightServiceSpy } from '../../fight/fight.service.spy';
import { Fight } from '../../fight/fight';
import { FightLineComponent } from '../../fight/fight-line/fight-line.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PointTypePipe } from '../../point/point-type.pipe';
import { PointService } from '../../point/point.service';
import { PointServiceSpy } from '../../point/point.service.spy';
import { PlayerService } from '../../player/player.service';
import { FightFormComponent } from '../../fight/fight-form/fight-form.component';
import { FormsModule } from '@angular/forms';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { TeamMemberServiceSpy } from '../../team/team-member.service.spy';
import { TeamMemberService } from '../../team/team-member.service';
import { PlayerServiceSpy } from '../../player/player.service.spy';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-result';
import { By } from '@angular/platform-browser';

const teamFightId: number = 13;
const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: teamFightId,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId,
  shiro_score: 0,
  aka_score: 0,
  status: FightStatus.Prepared,
  result: FightWinner.None
}

const akaPlayers: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 1
},
{
  name: 'P3',
  surname: 'S3',
  id: 3
},
{
  name: 'P5',
  surname: 'S5',
  id: 5
}];

const shiroPlayers: Player[] = [{
  name: 'P2',
  surname: 'S2',
  id: 2
},
{
  name: 'P4',
  surname: 'S4',
  id: 4
},
{
  name: 'P6',
  surname: 'S6',
  id: 6
}];

const shiroTeam: Team = {
  id: shiroTeamId,
  name: "T1",
  members: [shiroPlayers[0].id, shiroPlayers[1].id],
  tournament: tournamentId
}

const akaTeam: Team = {
  id: akaTeamId,
  name: "T2",
  members: [akaPlayers[0].id, akaPlayers[1].id],
  tournament: tournamentId
}

const fights: Fight[] = [{
  id: 78,
  points: [],
  aka: akaPlayers[0].id,
  shiro: shiroPlayers[0].id,
  team_fight: teamFightId,
  orderingNumber: 0
},
{
  id: 79,
  points: [],
  aka: akaPlayers[1].id,
  shiro: shiroPlayers[1].id,
  team_fight: teamFightId,
  orderingNumber: 1
}];

describe('TeamFightFullComponent', () => {
  let component: TeamFightFullComponent;
  let fixture: ComponentFixture<TeamFightFullComponent>;
  let teamService: TeamServiceSpy;
  let teamFightService: TeamFightServiceSpy;
  let fightService: FightServiceSpy;
  let playerService: PlayerServiceSpy;
  let teamMemberService: TeamMemberServiceSpy;
  let pointService: PointServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpy();
    teamFightService = new TeamFightServiceSpy();
    fightService = new FightServiceSpy();
    teamFightService.getReturnValues.push(teamFight);
    teamService.getReturnValues.push(akaTeam);
    teamService.getReturnValues.push(shiroTeam);
    fightService.getListReturnValues.push(fights);
    playerService = new PlayerServiceSpy();
    playerService.getReturnValues.push(akaPlayers[0]);
    playerService.getReturnValues.push(shiroPlayers[0]);
    playerService.getReturnValues.push(akaPlayers[1]);
    playerService.getReturnValues.push(shiroPlayers[1]);
    teamMemberService = new TeamMemberServiceSpy();
    teamMemberService.getListReturnValue.push(akaPlayers);
    teamMemberService.getListReturnValue.push(shiroPlayers);
    pointService = new PointServiceSpy();
    pointService.getListReturnValues.push([]);
    pointService.getListReturnValues.push([]);
    pointService.getListReturnValues.push([]);
    TestBed.configureTestingModule({
      declarations: [
        TeamFightFullComponent,
        FightLineComponent,
        PointTypePipe,
        FightFormComponent,
        PlayerLineComponent
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService },
        { provide: FightService, useValue: fightService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: teamFightId })
            }
          }
        },
        { provide: PointService, useValue: pointService },
        { provide: PlayerService, useValue: playerService },
        { provide: TeamMemberService, useValue: teamMemberService }
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  describe("when user is not authorized", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TeamFightFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should call teamFightService to get the team fight", () => {
      expect(teamFightService.getValues).toContain(teamFightId);
    });

    it("should call team service get for both team ids", () => {
      expect(teamService.getValues).toContain(akaTeam.id);
      expect(teamService.getValues).toContain(shiroTeam.id);
    });

    it("should call fightService to get the fights", () => {
      expect(fightService.getListValue).toContain(teamFightId);
    });

    it("should call teamMembersService to get teammembers of both teams", () => {
      expect(teamMemberService.getListValues).toContain(akaTeamId);
      expect(teamMemberService.getListValues).toContain(shiroTeamId);
    });

    it("should show team names", () => {
      expect(html.textContent).toContain(akaTeam.name);
      expect(html.textContent).toContain(shiroTeam.name);
    });

    it("should show names of players who have a fight", () => {
      expect(html.textContent).toContain(akaPlayers[0].name);
      expect(html.textContent).toContain(akaPlayers[0].surname);
      expect(html.textContent).toContain(akaPlayers[1].name);
      expect(html.textContent).toContain(akaPlayers[1].surname);
      expect(html.textContent).not.toContain(akaPlayers[2].name);
      expect(html.textContent).not.toContain(akaPlayers[2].surname);

      expect(html.textContent).toContain(shiroPlayers[0].name);
      expect(html.textContent).toContain(shiroPlayers[0].surname);
      expect(html.textContent).toContain(shiroPlayers[1].name);
      expect(html.textContent).toContain(shiroPlayers[1].surname);
      expect(html.textContent).not.toContain(shiroPlayers[2].name);
      expect(html.textContent).not.toContain(shiroPlayers[2].surname);
    });

    it("should not show form for creating new fights", () => {
      expect(html.querySelector('#add-fight-form')).toBeFalsy();
    });
  });

  describe("when user is authorized", () => {
    beforeEach(() => {
      teamFightService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(TeamFightFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should display form for adding new fights", () => {
      expect(html.querySelector('#add-fight-form')).toBeTruthy();
    });

    it("should allow setting aka as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-aka'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByAka: TeamFight = { ...teamFight };
      fightWonByAka.result = FightWinner.Aka;
      expect(teamFightService.updateValue).toEqual(fightWonByAka);
    });

    it("should allow setting shiro as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-shiro'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByShiro: TeamFight = { ...teamFight };
      fightWonByShiro.result = FightWinner.Shiro;
      expect(teamFightService.updateValue).toEqual(fightWonByShiro);
    });

    it("should allow setting none as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-none'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByNone: TeamFight = { ...teamFight };
      fightWonByNone.result = FightWinner.None;
      expect(teamFightService.updateValue).toEqual(fightWonByNone);
    });

    it("should allow setting fight as started", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-started'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightStarted: TeamFight = { ...teamFight };
      fightStarted.status = FightStatus.Started;
      expect(teamFightService.updateValue).toEqual(fightStarted);
    });

    it("should allow setting fight as prepared", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-prepared'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightPrepared: TeamFight = { ...teamFight };
      fightPrepared.status = FightStatus.Prepared;
      expect(teamFightService.updateValue).toEqual(fightPrepared);
    });

    it("should allow setting fight as finished", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-finished'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightFinished: TeamFight = { ...teamFight };
      fightFinished.status = FightStatus.Finished;
      expect(teamFightService.updateValue).toEqual(fightFinished);
    });

    describe("when reloadFights() method is called", () => {
      beforeEach(() => {
        component.reload();
      });
      it("loads fights again", () => {
        expect(fightService.getListValue.length).toBe(2);
        expect(fightService.getListValue[1]).toBe(teamFightId);
      });
    });
  });
});

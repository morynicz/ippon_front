import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupFightTileComponent } from './cup-fight-tile.component';
import { CupFight } from '../cup-fight';
import { TeamFight } from '../../team-fight/team-fight';
import { Team } from '../../team/team';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { TeamFightServiceSpy } from '../../team-fight/team-fight.service.spy';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FightStatusPipe } from '../../fight-status.pipe';

const cupFightId: number = 2754;
const cupPhaseId: number = 478;
const teamFightId: number = 3486;
const tournamentId: number = 423;

const teams: Team[] = [
  {
    id: 1001,
    name: "T1",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1002,
    name: "T2",
    members: [],
    tournament: tournamentId
  }
];

const teamFight: TeamFight = {
  id: 0,
  aka_team: teams[0].id,
  shiro_team: teams[1].id,
  tournament: tournamentId,
  shiro_score: 1,
  aka_score: 0,
  status: FightStatus.Prepared,
  winner: FightWinner.None
}

describe('CupFightTileComponent', () => {
  let component: CupFightTileComponent;
  let fixture: ComponentFixture<CupFightTileComponent>;
  let teamService: TeamServiceSpy;
  let teamFightService: TeamFightServiceSpy;
  let html;

  beforeEach(async(() => {
    teamFightService = new TeamFightServiceSpy();
    teamService = new TeamServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        CupFightTileComponent,
        FightStatusPipe
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService }
      ],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupFightTileComponent);
    component = fixture.componentInstance;
    teamFightService.getReturnValues.push(teamFight);
    teamService.getReturnValues.push(teams[0]);
    teamService.getReturnValues.push(teams[1]);
  });

  it('shows names of teams taking part in the fight', () => {
    component.cupFight = {
      id: cupFightId,
      cup_phase: cupPhaseId,
      previous_aka_fight: null,
      previous_shiro_fight: null,
      team_fight: teamFightId
    };
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;
    expect(html).toContain(teams[0].name);
    expect(html).toContain(teams[1].name);
  });

  it('shows nothing if there is no teamFight assigned to cupFight', () => {
    component.cupFight = {
      id: cupFightId,
      cup_phase: cupPhaseId,
      previous_aka_fight: null,
      previous_shiro_fight: null,
      team_fight: null
    };
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;
    expect(teamFightService.getValues.length).toBe(0);
  });

  it('has a link to the underlying teamfight', async(() => {
    component.cupFight = {
      id: cupFightId,
      cup_phase: cupPhaseId,
      previous_aka_fight: null,
      previous_shiro_fight: null,
      team_fight: teamFightId
    };
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/team-fights/' + teamFight.id);
    });
  }));
});

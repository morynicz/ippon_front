import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightFormComponent } from './fight-form.component';
import { TeamFight } from '../../team-fight/team-fight';
import { Player } from '../../player/player';
import { Team } from '../../team/team';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Fight } from '../fight';
import { By } from '@angular/platform-browser';
import { FightService } from '../fight.service';
import { FightServiceSpy } from '../fight.service.spy';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';

const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: 1,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId,
  shiro_score: 0,
  aka_score: 0,
  status: FightStatus.Prepared,
  winner: FightWinner.None
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
}];



function expectFightsToEqual(lhs: Fight, rhs: Fight): void {
  expect(lhs.id).toEqual(rhs.id);
  expect(lhs.aka).toEqual(rhs.aka);
  expect(lhs.shiro).toEqual(rhs.shiro);
  expect(rhs.team_fight).toEqual(rhs.team_fight);
  expect(lhs.orderingNumber).toEqual(rhs.orderingNumber);
  expect(lhs.points).toEqual(rhs.points);
}

describe('FightFormComponent', () => {
  let component: FightFormComponent;
  let fixture: ComponentFixture<FightFormComponent>;
  let fightService: FightServiceSpy;
  let reloadRequested: boolean;

  beforeEach(async(() => {
    fightService = new FightServiceSpy();
    reloadRequested = false;
    TestBed.configureTestingModule({
      declarations: [
        FightFormComponent,
        PlayerLineComponent
      ],
      providers: [
        { provide: FightService, useValue: fightService }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.shiroPlayers = shiroPlayers;
    component.akaPlayers = akaPlayers;
    component.teamFight = teamFight.id;
    component.reloadRequest.subscribe(() => {
      reloadRequested = true;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should provide possibility to select any player from shiro team", () => {
    let html = fixture.debugElement.nativeElement.textContent;
    expect(html).toContain(shiroPlayers[0].name);
    expect(html).toContain(shiroPlayers[0].surname);
    expect(html).toContain(shiroPlayers[1].name);
    expect(html).toContain(shiroPlayers[1].surname);
  });

  it("should provide possibility to select any player from aka team", () => {
    let html = fixture.debugElement.nativeElement.textContent;
    expect(html).toContain(akaPlayers[0].name);
    expect(html).toContain(akaPlayers[0].surname);
    expect(html).toContain(akaPlayers[1].name);
    expect(html).toContain(akaPlayers[1].surname);
  });

  describe("when players are selected and create button is pushed", () => {
    let btn;
    let expectedFight: Fight;

    beforeEach(() => {
      btn = fixture.debugElement.query(By.css("#save-fight"));
      expectedFight = {
        id: 0,
        aka: akaPlayers[0].id,
        shiro: shiroPlayers[0].id,
        team_fight: teamFight.id,
        points: [],
        orderingNumber: 0,
        winner: FightWinner.None,
        status: FightStatus.Prepared
      };
      component.fight.aka = akaPlayers[0].id;
      component.fight.shiro = shiroPlayers[0].id;

      btn.nativeElement.click();

    });

    it("should create a fight with set players and teamFight id", () => {
      expectFightsToEqual(expectedFight, fightService.addValues[0]);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });

});

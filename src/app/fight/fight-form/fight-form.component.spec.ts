import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightFormComponent } from './fight-form.component';
import { TeamFight } from '../../team-fight/team-fight';
import { Player } from '../../player/player';
import { Sex } from '../../sex';
import { Rank } from '../../rank';
import { Team } from '../../team/team';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Fight } from '../fight';
import { By } from '@angular/platform-browser';
import { FightService } from '../fight.service';
import { FightServiceSpy } from '../fight.service.spy';

const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: 1,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId
}

const akaPlayers: Player[] = [{
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 1
},
{
  name: 'P3',
  surname: 'S3',
  sex: Sex.Male,
  birthday: new Date("2003-03-03"),
  rank: Rank.Kyu_3,
  club_id: 0,
  id: 3
}];

const shiroPlayers: Player[] = [{
  name: 'P2',
  surname: 'S2',
  sex: Sex.Female,
  birthday: new Date("2002-02-02"),
  rank: Rank.Kyu_2,
  club_id: 2,
  id: 2
},
{
  name: 'P4',
  surname: 'S4',
  sex: Sex.Female,
  birthday: new Date("2004-04-04"),
  rank: Rank.Kyu_4,
  club_id: 4,
  id: 4
}];

const shiroTeam: Team = {
  id: 22,
  name: "T1",
  members: [shiroPlayers[0].id, shiroPlayers[1].id],
  tournament: tournamentId
}

const akaTeam: Team = {
  id: 22,
  name: "T2",
  members: [akaPlayers[0].id, akaPlayers[1].id],
  tournament: tournamentId
}

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
    component.reloadRequest.subscribe(req => {
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
        orderingNumber: 0
      };
      component.fight.aka = akaPlayers[0].id;
      component.fight.shiro = shiroPlayers[0].id;

      btn.nativeElement.click();

    });

    it("should create a fight with set players and teamFight id", () => {
      expectFightsToEqual(expectedFight, fightService.addValue);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });

});

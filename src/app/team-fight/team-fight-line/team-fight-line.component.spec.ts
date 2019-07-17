import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFightLineComponent } from './team-fight-line.component';
import { TeamFight } from '../team-fight';
import { Team } from '../../team/team';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { TeamFightServiceSpy } from '../team-fight.service.spy';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../team-fight.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';
import { FightStatusPipe } from '../../fight-status.pipe';

const teamFightId: number = 13;
const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: teamFightId,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId,
  shiro_score: 1,
  aka_score: 3,
  status: FightStatus.Finished,
  winner: FightWinner.Shiro
}

const shiroTeam: Team = {
  id: shiroTeamId,
  name: "T1",
  members: [],
  tournament: tournamentId
}

const akaTeam: Team = {
  id: akaTeamId,
  name: "T2",
  members: [],
  tournament: tournamentId
}

describe('TeamFightLineComponent', () => {
  let component: TeamFightLineComponent;
  let fixture: ComponentFixture<TeamFightLineComponent>;
  let teamService: TeamServiceSpy;
  let teamFightService: TeamFightServiceSpy;
  let de: DebugElement;

  beforeEach(async(() => {
    teamService = new TeamServiceSpy();
    teamFightService = new TeamFightServiceSpy();
    teamFightService.getReturnValues.push(teamFight);
    teamService.getReturnValues.push(akaTeam);
    teamService.getReturnValues.push(shiroTeam);

    TestBed.configureTestingModule({
      declarations: [
        TeamFightLineComponent,
        FightStatusPipe
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService },
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  describe("when everything is properly initialized from the beginning", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TeamFightLineComponent);
      component = fixture.componentInstance;
      component.teamFight = teamFight;
      component.isAuthorized = false;
      fixture.detectChanges();
      de = fixture.debugElement;
    });

    it('shows aka team name on aka team side', () => {
      let teamSide = de.query(By.css("#aka-team"));
      expect(teamSide.nativeElement.textContent).toContain(akaTeam.name);
    });

    it('shows aka team score on aka team side', () => {
      let teamSide = de.query(By.css("#aka-team"));
      expect(teamSide.nativeElement.textContent).toContain(teamFight.aka_score);
    });


    it('shows shiro team name on shiro team side', () => {
      let teamSide = de.query(By.css("#shiro-team"));
      expect(teamSide.nativeElement.textContent).toContain(shiroTeam.name);
    });

    it('shows shiro team score on shiro team side', () => {
      let teamSide = de.query(By.css("#shiro-team"));
      expect(teamSide.nativeElement.textContent).toContain(teamFight.shiro_score);
    });


    it('does not show delete button when user not authorized', () => {
      const html = fixture.debugElement.nativeElement;
      expect(html.querySelector('#delete-team-fight')).toBeFalsy();
    });

    it('should provide link to the group phase', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/team-fights/' + teamFight.id);
    });

    describe("when delete button is clicked", () => {
      let btn;
      let reloadRequested: boolean;

      beforeEach(async(() => {
        reloadRequested = false;
        component.reloadRequest.subscribe(req => {
          reloadRequested = true;
        });
        component.isAuthorized = true;
        fixture.detectChanges();
        btn = fixture.debugElement.query(By.css("#delete-team-fight"));
        btn.nativeElement.click();

      }));

      it("sends to delete request for teamFight to teamFight.service",
        () => {
          expect(teamFightService.deleteValue).toEqual(teamFight);
        });

      it("triggers reload request in parent component", () => {
        expect(reloadRequested).toBe(true);
      });

    });
  });
  describe("when some vital information are missing on the beginning", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TeamFightLineComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      de = fixture.debugElement;
    });

    it('shows aka team name on aka team side', () => {
      component.teamFight = teamFight;
      fixture.detectChanges();
      let akaTeamSide = de.query(By.css("#aka-team"));
      expect(akaTeamSide.nativeElement.textContent).toContain(akaTeam.name);
    });

    it('shows shiro team name on shiro team side', () => {
      component.teamFight = teamFight;
      fixture.detectChanges();
      let akaTeamSide = de.query(By.css("#shiro-team"));
      expect(akaTeamSide.nativeElement.textContent).toContain(shiroTeam.name);
    });

  });
});

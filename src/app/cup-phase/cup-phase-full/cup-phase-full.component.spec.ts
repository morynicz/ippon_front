import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPhaseFullComponent } from './cup-phase-full.component';
import { Team } from '../../team/team';
import { TeamFight } from '../../team-fight/team-fight';
import { CupFight } from '../../cup-fight/cup-fight';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { CupFightServiceSpy } from '../../cup-fight/cup-fight.service.spy';
import { TeamFightServiceSpy } from '../../team-fight/team-fight.service.spy';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { teams, cupFights, teamFights, cupPhaseId, tournamentId } from './test-scaffolding';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CupPhaseServiceSpy } from '../cup-phase.service.spy';
import { CupPhase } from '../cup-phase';
import { CupPhaseService } from '../cup-phase.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

class TeamFightServiceSpyMapped extends TeamFightServiceSpy {
  getReturnValuesMap: Map<number, TeamFight> = new Map<number, TeamFight>();
  get(id: number): Observable<TeamFight> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }
}

class TeamServiceSpyMapped extends TeamServiceSpy {
  getReturnValuesMap: Map<number, Team> = new Map<number, Team>();
  get(id: number): Observable<Team> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }
}

class CupFightServiceSpyMultiDeletion extends CupFightServiceSpy {
  deleteValues: CupFight[] = [];
  delete(cupFight: CupFight): Observable<{}> {
    this.deleteValues.push(cupFight);
    return of({});
  }
}

const cupPhase: CupPhase = {
  id: cupPhaseId,
  tournament: tournamentId,
  name: "CP1",
  fight_length: 4,
  final_fight_length: 5
}

describe('CupPhaseFullComponent', () => {
  let component: CupPhaseFullComponent;
  let fixture: ComponentFixture<CupPhaseFullComponent>;
  let teamService: TeamServiceSpyMapped;
  let cupFightService: CupFightServiceSpyMultiDeletion;
  let teamFightService: TeamFightServiceSpyMapped;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new TeamFightServiceSpyMapped();
    cupFightService = new CupFightServiceSpyMultiDeletion();
    cupPhaseService = new CupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [CupPhaseFullComponent],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService },
        { provide: CupFightService, useValue: cupFightService },
        { provide: CupPhaseService, useValue: cupPhaseService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: cupPhaseId })
            }
          }
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  describe("when created", () => {
    beforeEach(() => {
      cupPhaseService.getReturnValues.push(cupPhase);
      cupFightService.getListReturnValues.push([]);
      teamService.getListReturnValues.push([]);
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("gets the cup phase information", () => {
      expect(cupPhaseService.getValues).toEqual([cupPhaseId]);
    });
  });

  describe("when there are 32 competitors", () => {
    beforeEach(() => {
      teamService.getListReturnValues.push([]);
      cupPhaseService.getReturnValues.push(cupPhase);
      cupFightService.getListReturnValues.push(cupFights);
      teams.forEach(team => {
        teamService.getReturnValuesMap.set(team.id, team);
      });
      teamFights.forEach(teamFight => {
        teamFightService.getReturnValuesMap.set(teamFight.id, teamFight);
      });
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("shows all team nubers present in bracket", () => {
      let teamNames: string[] = teams.map((v, idx, arr) => v.name);
      teamNames.forEach(teamName => expect(html).toContain(teamName));
    });

    describe("when delete cup button is clicked", () => {
      let del;
      beforeEach(() => {
        del = fixture.debugElement.query(By.css("#delete-cup")).nativeElement;
        del.click();
      });
      it("deletes all cup fights of this cup phase", () => {
        expect(new Set(cupFightService.deleteValues)).toEqual(new Set(cupFights));
      });
    });

  });

  describe("when cup phase has no fights yet", () => {
    beforeEach(() => {
      cupPhaseService.getReturnValues.push(cupPhase);
      cupFightService.getListReturnValues.push([]);
      teamService.getListReturnValues.push([teams[0], teams[1], teams[2]]);
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("shows teams available to select for cup phase", () => {
      expect(html).toContain(teams[0].name);
      expect(html).toContain(teams[1].name);
      expect(html).toContain(teams[2].name);
    });

    describe("when teams are selected and 'generate cup' button is clicked", () => {
      let cb1, cb3, gen;
      const teamFightId = 5;
      let expectedTeamFight: TeamFight = {
        id: 0,
        aka_team: teams[0].id,
        shiro_team: teams[2].id,
        tournament: tournamentId
      }
      let expectedCupFight: CupFight = {
        id: 0,
        cup_phase: cupPhaseId,
        previous_aka_fight: null,
        previous_shiro_fight: null,
        team_fight: teamFightId
      }
      let returnedTeamFight: TeamFight = { ...expectedTeamFight };
      beforeEach(() => {
        returnedTeamFight.id = teamFightId;
        returnedTeamFight.aka_team = teams[3].id;
        returnedTeamFight.shiro_team = teams[4].id;
        teamFightService.getReturnValuesMap.set(returnedTeamFight.id, returnedTeamFight);
        teamService.getReturnValuesMap.set(teams[3].id, teams[3]);
        teamService.getReturnValuesMap.set(teams[4].id, teams[4]);
        teamFightService.addReturnValue = returnedTeamFight;
        cupFightService.getListReturnValues.push([expectedCupFight]);
        teamService.getListReturnValues.push([]);
        cb1 = fixture.debugElement.query(By.css("#select-team-" + teams[0].id)).nativeElement;
        cb3 = fixture.debugElement.query(By.css("#select-team-" + teams[2].id)).nativeElement;
        cb1.click();
        cb3.click();
        gen = fixture.debugElement.query(By.css("#generate-cup")).nativeElement;
        gen.click();
        fixture.detectChanges();
      });

      it("creates one cup fight with selected teams", () => {
        expect(teamFightService.addValue).toEqual(expectedTeamFight);
        expect(cupFightService.addValue).toEqual(expectedCupFight);
      });

      xit("reloads to show new fight", (done) => {
        fixture.whenStable().then(() => {
          expect(html).toContain(teams[3].name);
          expect(html).toContain(teams[4].name);
          done();
        });
      });
    });
  });
});

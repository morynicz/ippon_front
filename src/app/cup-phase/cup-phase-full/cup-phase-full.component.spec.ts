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
  let cupFightService: CupFightServiceSpy;
  let teamFightService: TeamFightServiceSpyMapped;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new TeamFightServiceSpyMapped();
    cupFightService = new CupFightServiceSpy();
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
      ]
    })
      .compileComponents();
  }));

  describe("when created", () => {
    beforeEach(() => {
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

    it("gets the cup phase information", () => {
      expect(cupPhaseService.getValues).toEqual([cupPhaseId]);
    });
  });

  describe("when there are 32 competitors", () => {
    beforeEach(() => {
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

  });
});

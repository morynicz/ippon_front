import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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
import { CupFightTileComponent } from '../../cup-fight/cup-fight-tile/cup-fight-tile.component';
import { CupCreationComponent } from '../cup-creation/cup-creation.component';
import { CupSideComponent } from '../cup-side/cup-side.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FightStatusPipe } from '../../fight-status.pipe';

class TeamFightServiceSpyMapped extends TeamFightServiceSpy {
  getReturnValuesMap: Map<number, TeamFight> = new Map<number, TeamFight>();
  get(id: number): Observable<TeamFight> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }

  addReturnValues: TeamFight[] = [];
  addValues: TeamFight[] = [];
  add(teamFight: TeamFight): Observable<TeamFight> {
    this.addValues.push(teamFight);
    return of(this.addReturnValues.shift());
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

  addReturnIdValues: number[] = [];
  addValues: CupFight[] = [];
  add(added: CupFight): Observable<CupFight> {
    this.addValues.push(added);
    let cupFightCopy: CupFight = { ...added };
    cupFightCopy.id = this.addReturnIdValues.shift();
    return of(cupFightCopy);
  }
}

const cupPhase: CupPhase = {
  id: cupPhaseId,
  tournament: tournamentId,
  name: "CP1",
  fight_length: 4,
  final_fight_length: 5,
  number_of_positions: 8
}

describe('CupPhaseFullComponent', () => {
  let component: CupPhaseFullComponent;
  let fixture: ComponentFixture<CupPhaseFullComponent>;
  let teamService: TeamServiceSpyMapped;
  let cupFightService: CupFightServiceSpyMultiDeletion;
  let teamFightService: TeamFightServiceSpyMapped;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new TeamFightServiceSpyMapped();
    cupFightService = new CupFightServiceSpyMultiDeletion();
    cupPhaseService = new CupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        CupPhaseFullComponent,
        CupFightTileComponent,
        CupCreationComponent,
        CupSideComponent,
        FightStatusPipe
      ],
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
      imports: [
        FormsModule,
        RouterTestingModule
      ]
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

  describe("when there are 32 competitors and user is authorized", () => {
    beforeEach(() => {
      teamService.getListReturnValues.push([]);
      let cupPhase32Positions = { ...cupPhase }
      cupPhase32Positions.number_of_positions = 32;
      cupPhaseService.getReturnValues.push(cupPhase32Positions);
      cupPhaseService.isAuthorizedReturnValue = true;
      cupFightService.getListReturnValues.push(cupFights);
      teams.forEach(team => {
        teamService.getReturnValuesMap.set(team.id, team);
      });
      teamFights.forEach(teamFight => {
        teamFightService.getReturnValuesMap.set(teamFight.id, teamFight);
      });
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("shows all team names present in bracket", () => {
      let teamNames: string[] = teams.map((v) => v.name);
      teamNames.forEach(teamName => expect(html).toContain(teamName));
    });

    describe("when looking at positions of displayed competitors", () => {
      it("shows final fight in finals area", () => {
        let centerColumn = fixture.debugElement.query(By.css("#final-fight"));
        expect(centerColumn.query(By.css("#cup-final-" + cupFights[0].id))).toBeTruthy();
      });

      describe("on the aka side", () => {
        let akaArea;
        beforeEach(() => {
          akaArea = fixture.debugElement.query(By.css("#aka-side"));
        });
        it("shows fights leading to this side finalist in this area", () => {
          expect(akaArea.query(By.css("#cup-fight-2"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-4"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-5"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-8"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-9"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-10"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-11"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-16"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-17"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-18"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-19"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-20"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-21"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-22"))).toBeTruthy();
          expect(akaArea.query(By.css("#cup-fight-23"))).toBeTruthy();
        });
        it("shows only leaf fights in leaf area", () => {
          let leafArea = akaArea.query(By.css("#leaf-area"));
          expect(leafArea.query(By.css("#cup-fight-16"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-17"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-18"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-19"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-20"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-21"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-22"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-23"))).toBeTruthy();

          expect(leafArea.query(By.css("#cup-fight-2"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-4"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-5"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-8"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-9"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-10"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-11"))).toBeFalsy();
        });

        it("shows only semi-final fight in level-0 area", () => {
          let levelArea = akaArea.query(By.css("#level-0"));
          expect(levelArea.query(By.css("#cup-fight-2"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-4"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-5"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-8"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-9"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-10"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-11"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
        });

        it("shows only quarter-final fights in level-1 area", () => {
          let levelArea = akaArea.query(By.css("#level-1"));
          expect(levelArea.query(By.css("#cup-fight-2"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-4"))).toBeTruthy("cf4");
          expect(levelArea.query(By.css("#cup-fight-5"))).toBeTruthy("cf5");
          expect(levelArea.query(By.css("#cup-fight-8"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-9"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-10"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-11"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
        });

        it("shows only eight-final fights in level-2 area", () => {
          let levelArea = akaArea.query(By.css("#level-2"));
          expect(levelArea.query(By.css("#cup-fight-2"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-4"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-5"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-8"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-9"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-10"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-11"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
        });


      });

      describe("on the shiro side", () => {
        let shiroArea;
        beforeEach(() => {
          shiroArea = fixture.debugElement.query(By.css("#shiro-side"));
        });
        it("shows fights leading to this side finalist in this area", () => {
          expect(shiroArea.query(By.css("#cup-fight-3"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-6"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-7"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-12"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-13"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-14"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-15"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-24"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-25"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-26"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-27"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-28"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-29"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-30"))).toBeTruthy();
          expect(shiroArea.query(By.css("#cup-fight-31"))).toBeTruthy();
        });
        it("shows only leaf fights in leaf area", () => {
          let leafArea = shiroArea.query(By.css("#leaf-area"));
          expect(leafArea.query(By.css("#cup-fight-3"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-6"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-7"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-12"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-13"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-14"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-15"))).toBeFalsy();
          expect(leafArea.query(By.css("#cup-fight-24"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-25"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-26"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-27"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-28"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-29"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-30"))).toBeTruthy();
          expect(leafArea.query(By.css("#cup-fight-31"))).toBeTruthy();
        });

        it("shows only semi-final fight in level-0 area", () => {
          let levelArea = shiroArea.query(By.css("#level-0"));
          expect(levelArea.query(By.css("#cup-fight-3"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-6"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-7"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-12"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-13"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-14"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-15"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-24"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-25"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-26"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-27"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-28"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-29"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-30"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-31"))).toBeFalsy();
        });

        it("shows only quarter-final fights in level-1 area", () => {
          let levelArea = shiroArea.query(By.css("#level-1"));
          expect(levelArea.query(By.css("#cup-fight-3"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-6"))).toBeTruthy("cf4");
          expect(levelArea.query(By.css("#cup-fight-7"))).toBeTruthy("cf5");
          expect(levelArea.query(By.css("#cup-fight-12"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-13"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-14"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-15"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-24"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-25"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-26"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-27"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-28"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-29"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-30"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-31"))).toBeFalsy();
        });

        it("shows only eight-final fights in level-2 area", () => {
          let levelArea = shiroArea.query(By.css("#level-2"));
          expect(levelArea.query(By.css("#cup-fight-3"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-6"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-7"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-12"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-13"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-14"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-15"))).toBeTruthy();
          expect(levelArea.query(By.css("#cup-fight-24"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-25"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-26"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-27"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-28"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-29"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-30"))).toBeFalsy();
          expect(levelArea.query(By.css("#cup-fight-31"))).toBeFalsy();
        });


      });


    });

    describe("when delete cup button is clicked", () => {
      let del;
      beforeEach(() => {
        cupFightService.getListReturnValues.push([]);
        cupFightService.getListValues = [];
        del = fixture.debugElement.query(By.css("#delete-cup")).nativeElement;
        del.click();
      });
      it("deletes all cup fights of this cup phase", () => {
        expect(new Set(cupFightService.deleteValues)).toEqual(new Set(cupFights));
      });
      it("reloads the cup fights", () => {
        fixture.detectChanges();
        expect(cupFightService.getListValues).toEqual([cupPhaseId]);
      });
    });
  });

  describe("when user is not authorized", () => {
    beforeEach(() => {
      teamService.getListReturnValues.push([]);
      cupPhaseService.getReturnValues.push(cupPhase);
      cupPhaseService.isAuthorizedReturnValue = false;
      cupFightService.getListReturnValues.push(cupFights);
      teams.forEach(team => {
        teamService.getReturnValuesMap.set(team.id, team);
      });
      teamFights.forEach(teamFight => {
        teamFightService.getReturnValuesMap.set(teamFight.id, teamFight);
      });
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("does not show cup creation/deletion controls", () => {
      expect(fixture.debugElement.query(By.css("#delete-cup"))).toBeFalsy();
      expect(fixture.debugElement.query(By.css("#cup-phase-number-of-teams"))).toBeFalsy();
      expect(fixture.debugElement.query(By.css("#generate-cup"))).toBeFalsy();
    });
  });
});

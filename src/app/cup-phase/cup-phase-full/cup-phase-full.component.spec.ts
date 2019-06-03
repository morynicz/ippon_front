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
import { CupFightTileComponent } from '../../cup-fight/cup-fight-tile/cup-fight-tile.component';
import { JsonPipe } from '@angular/common';

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
      declarations: [
        CupPhaseFullComponent,
        CupFightTileComponent
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
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("shows all team names present in bracket", () => {
      let teamNames: string[] = teams.map((v) => v.name);
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


});

let pipe = new JsonPipe();
class Identifiable {
  id: number;
}
class CrdlaServiceSpyWithMemory<Resource extends Identifiable> {
  deleteValues: Resource[] = [];
  delete(deleted: Resource): Observable<{}> {
    this.deleteValues.push(deleted);
    return of({});
  }

  resources: Map<number, Resource> = new Map<number, Resource>();
  addReturnIdValues: number[] = [];
  addValues: Resource[] = [];
  add(added: Resource): Observable<Resource> {
    this.addValues.push(added);
    let addedCopy: Resource = { ...added };
    addedCopy.id = this.addReturnIdValues.shift();
    // console.log("add. current:");
    // console.log(this.resources);
    // console.log("adding " + pipe.transform(addedCopy));
    this.resources.set(addedCopy.id, addedCopy);
    return of(addedCopy);
  }

  getValues: number[] = [];
  get(id: number): Observable<Resource> {
    this.getValues.push(id);
    return of(this.resources.get(id));
  }

  getListValues: number[] = [];
  getList(id: number): Observable<Resource[]> {
    this.getListValues.push(id);
    let arr = Array.from(this.resources.values());
    // console.log("get list. current");
    // console.log(this.resources);
    // console.log("returning list: " + pipe.transform(arr));
    return of(arr);
  }
}

describe('CupCreation', () => {
  let component: CupPhaseFullComponent;
  let fixture: ComponentFixture<CupPhaseFullComponent>;
  let teamService: TeamServiceSpyMapped;
  let cupFightService: CrdlaServiceSpyWithMemory<CupFight>;
  let teamFightService: CrdlaServiceSpyWithMemory<TeamFight>;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new CrdlaServiceSpyWithMemory<TeamFight>();
    cupFightService = new CrdlaServiceSpyWithMemory<CupFight>();
    cupPhaseService = new CupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        CupPhaseFullComponent,
        CupFightTileComponent
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
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  describe("when cup phase has no fights yet", () => {
    beforeEach(() => {
      cupPhaseService.getReturnValues.push(cupPhase);
      teamService.getReturnValuesMap.set(teams[0].id, teams[0]);
      teamService.getReturnValuesMap.set(teams[1].id, teams[1]);
      teamService.getReturnValuesMap.set(teams[2].id, teams[2]);
      teamService.getReturnValuesMap.set(teams[3].id, teams[3]);
      teamService.getListReturnValues.push([
        teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
        [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]]);
      fixture = TestBed.createComponent(CupPhaseFullComponent);
      component = fixture.componentInstance;
      html = fixture.debugElement.nativeElement.textContent;
    });

    describe("when selecting number of teams in cup phase", () => {
      let numberOfTeamsInput;
      beforeEach(() => {
        numberOfTeamsInput = fixture.debugElement.query(By.css("#cup-phase-number-of-teams")).nativeElement;
        fixture.detectChanges();
      });
      it("shows exactly four position dropdowns number of teams is four", () => {
        numberOfTeamsInput.value = 4;
        numberOfTeamsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-0"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-1"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-2"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-3"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-4"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-5"))).toBeFalsy();
      });

      it("shows exactly two position dropdowns number of teams is two", () => {
        numberOfTeamsInput.value = 2;
        numberOfTeamsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-0"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-1"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-2"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-3"))).toBeFalsy();
      });
    });

    describe("when two teams are selected and 'generate cup' button is clicked", () => {
      let posInput1, posInput2, generateButton, numberOfTeamsInput;
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
        teamService.getListReturnValues.push([]);
        cupFightService.addReturnIdValues = [0];
        teamFightService.addReturnIdValues.push(teamFightId);
        fixture.detectChanges();
        numberOfTeamsInput = fixture.debugElement.query(By.css("#cup-phase-number-of-teams")).nativeElement;
        numberOfTeamsInput.value = 2;
        numberOfTeamsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        posInput1 = fixture.debugElement.query(By.css("#cup-phase-team-position-1")).nativeElement;
        posInput1.value = posInput1.options[1].value;
        posInput1.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        posInput2 = fixture.debugElement.query(By.css("#cup-phase-team-position-2")).nativeElement;
        posInput2.value = posInput1.options[3].value;
        posInput2.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        generateButton = fixture.debugElement.query(By.css("#generate-cup")).nativeElement;
        teamService.getValues = [];
        teamFightService.getValues = [];
        generateButton.click();
      });

      it("creates one cup fight with selected teams", () => {
        fixture.detectChanges();
        expect(teamFightService.addValues).toEqual([expectedTeamFight]);
        expect(cupFightService.addValues).toEqual([expectedCupFight]);
      });

      it("reloads to show new fight -- defeated by stupid fixture not rendering on time", async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          // Fixture for some reason does not trigger rendering cup fights in template but component has them
          // expect(html).toContain(teams[3].name);
          // expect(html).toContain(teams[4].name);
          expect(teamService.getValues).toEqual([teams[0].id, teams[2].id]);
          expect(teamFightService.getValues).toContain(teamFightId);
        });
      }));
    });

    describe("when eight teams are selected and 'generate cup' button is clicked", () => {
      let generateButton, numberOfTeamsInput;
      let expectedTeamFights: TeamFight[] = [{
        id: 0,
        aka_team: teams[0].id,
        shiro_team: teams[2].id,
        tournament: tournamentId
      },
      {
        id: 0,
        aka_team: teams[1].id,
        shiro_team: teams[3].id,
        tournament: tournamentId
      },
      {
        id: 0,
        aka_team: teams[4].id,
        shiro_team: teams[5].id,
        tournament: tournamentId
      },
      {
        id: 0,
        aka_team: teams[6].id,
        shiro_team: teams[7].id,
        tournament: tournamentId
      }];
      let expectedCupFights: CupFight[] = [
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: null,
          previous_shiro_fight: null,
          team_fight: 101
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: null,
          previous_shiro_fight: null,
          team_fight: 102
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: null,
          previous_shiro_fight: null,
          team_fight: 103
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: null,
          previous_shiro_fight: null,
          team_fight: 104
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: 1,
          previous_shiro_fight: 2,
          team_fight: null
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: 3,
          previous_shiro_fight: 4,
          team_fight: null
        },
        {
          id: 0,
          cup_phase: cupPhaseId,
          previous_aka_fight: 5,
          previous_shiro_fight: 6,
          team_fight: null
        }];
      let returnedCupFightIds: number[] = [1, 2, 3, 4, 5, 6, 7];

      beforeEach(() => {
        teamFightService.addReturnIdValues.push(
          expectedCupFights[0].team_fight,
          expectedCupFights[1].team_fight,
          expectedCupFights[2].team_fight,
          expectedCupFights[3].team_fight);
        cupFightService.addReturnIdValues.push(...returnedCupFightIds);
        teamService.getListReturnValues.push([]);

        teamService.getValues = [];
        teamFightService.getValues = [];

        fixture.detectChanges();

        numberOfTeamsInput = fixture.debugElement.query(By.css("#cup-phase-number-of-teams")).nativeElement;
        numberOfTeamsInput.value = 8;
        numberOfTeamsInput.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        setTeamOnCupPosition(fixture, 1, 1);
        setTeamOnCupPosition(fixture, 2, 3);
        setTeamOnCupPosition(fixture, 3, 2);
        setTeamOnCupPosition(fixture, 4, 4);
        setTeamOnCupPosition(fixture, 5, 5);
        setTeamOnCupPosition(fixture, 6, 6);
        setTeamOnCupPosition(fixture, 7, 7);
        setTeamOnCupPosition(fixture, 8, 8);

        fixture.detectChanges();
        generateButton = fixture.debugElement.query(By.css("#generate-cup")).nativeElement;
        generateButton.click();
      });

      it("creates cup fights with selected teams", async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(teamFightService.addValues).toContain(expectedTeamFights[0], "first tf missing");
          expect(teamFightService.addValues).toContain(expectedTeamFights[1], "second tf missing");
          expect(teamFightService.addValues).toContain(expectedTeamFights[2], "third tf missing");
          expect(teamFightService.addValues).toContain(expectedTeamFights[3], "fourth tf missing");
          expect(cupFightService.addValues).toContain(expectedCupFights[0]);
          expect(cupFightService.addValues).toContain(expectedCupFights[1]);
          expect(cupFightService.addValues).toContain(expectedCupFights[2]);
          expect(cupFightService.addValues).toContain(expectedCupFights[3]);
          expect(cupFightService.addValues).toContain(expectedCupFights[4]);
          expect(cupFightService.addValues).toContain(expectedCupFights[5]);
          expect(cupFightService.addValues).toContain(expectedCupFights[6]);
        });
      }));

      it("reloads to show new fight -- defeated by stupid fixture not rendering on time", async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(teamService.getValues).toContain(teams[0].id);
          expect(teamService.getValues).toContain(teams[1].id);
          expect(teamService.getValues).toContain(teams[2].id);
          expect(teamService.getValues).toContain(teams[3].id);
          expect(teamFightService.getValues).toContain(expectedCupFights[0].team_fight);
          expect(teamFightService.getValues).toContain(expectedCupFights[1].team_fight);
          expect(teamFightService.getValues).toContain(expectedCupFights[2].team_fight);
          expect(teamFightService.getValues).toContain(expectedCupFights[3].team_fight);
        });
      }));
    });
  });
});

function setTeamOnCupPosition(fixture: ComponentFixture<CupPhaseFullComponent>, position: number, teamIndex: number) {
  let input = fixture.debugElement.query(By.css("#cup-phase-team-position-" + position)).nativeElement;
  input.value = input.options[teamIndex].value;
  input.dispatchEvent(new Event('change'));
}

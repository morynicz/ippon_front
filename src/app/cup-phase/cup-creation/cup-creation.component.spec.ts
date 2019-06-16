import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupCreationComponent } from './cup-creation.component';
import { Observable, of } from 'rxjs';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { Team } from '../../team/team';
import { CupFight } from '../../cup-fight/cup-fight';
import { TeamFight } from '../../team-fight/team-fight';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { By } from '@angular/platform-browser';
import { JsonPipe } from '@angular/common';
import { CupPhase } from '../cup-phase';
import { FormsModule } from '@angular/forms';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';



let pipe = new JsonPipe();
class Identifiable {
  id: number;
}

const cupPhaseId: number = 78;
const tournamentId: number = 32;
export const teams: Team[] = [
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
  },
  {
    id: 1003,
    name: "T3",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1004,
    name: "T4",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1005,
    name: "T5",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1006,
    name: "T6",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1007,
    name: "T7",
    members: [],
    tournament: tournamentId
  },
  {
    id: 1008,
    name: "T8",
    members: [],
    tournament: tournamentId
  }];
const cupPhase: CupPhase = {
  id: cupPhaseId,
  tournament: tournamentId,
  name: "CP1",
  fight_length: 4,
  final_fight_length: 5,
  number_of_positions: 8
}
class TeamServiceSpyMapped extends TeamServiceSpy {
  getReturnValuesMap: Map<number, Team> = new Map<number, Team>();
  get(id: number): Observable<Team> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }
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
    return of(arr);
  }
}

describe('CupCreationComponent', () => {
  let component: CupCreationComponent;
  let fixture: ComponentFixture<CupCreationComponent>;
  let teamService: TeamServiceSpyMapped;
  let cupFightService: CrdlaServiceSpyWithMemory<CupFight>;
  let teamFightService: CrdlaServiceSpyWithMemory<TeamFight>;
  let reloadRequested: boolean;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new CrdlaServiceSpyWithMemory<TeamFight>();
    cupFightService = new CrdlaServiceSpyWithMemory<CupFight>();
    reloadRequested = false;

    TestBed.configureTestingModule({
      declarations: [CupCreationComponent],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService },
        { provide: CupFightService, useValue: cupFightService }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  describe("when there are any cup fights present", () => {
    const cupFights = [
      {
        id: 1,
        team_fight: 101,
        cup_phase: cupPhaseId,
        previous_aka_fight: 2,
        previous_shiro_fight: 3
      },
      {
        id: 2,
        team_fight: 102,
        cup_phase: cupPhaseId,
        previous_aka_fight: 4,
        previous_shiro_fight: 5
      }];
    beforeEach(() => {
      fixture = TestBed.createComponent(CupCreationComponent);
      component = fixture.componentInstance;
      component.cupPhase = { ...cupPhase };
      component.cupFights = cupFights;
      component.reloadRequest.subscribe(() => {
        reloadRequested = true;
      });
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("does not show generate cup button", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css("#generate-cup"))).toBeFalsy();
    });

    it("does not show team selection selects", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css("#cup-phase-team-position-1"))).toBeFalsy();
      expect(fixture.debugElement.query(By.css("#cup-phase-team-position-4"))).toBeFalsy();
      expect(fixture.debugElement.query(By.css("#cup-phase-team-position-8"))).toBeFalsy();
    });

    describe("when delete cup button is clicked", () => {
      let del;
      beforeEach(() => {
        fixture.detectChanges();
        del = fixture.debugElement.query(By.css("#delete-cup")).nativeElement;
        del.click();
      });
      it("deletes all cup fights of this cup phase", () => {
        expect(new Set(cupFightService.deleteValues)).toEqual(new Set(cupFights));
      });
      it("reloads the cup fights", () => {
        fixture.detectChanges();
        expect(reloadRequested).toBeTruthy();
      });
    });


  });

  describe("when cup phase has no fights yet", () => {
    beforeEach(() => {
      teamService.getReturnValuesMap.set(teams[0].id, teams[0]);
      teamService.getReturnValuesMap.set(teams[1].id, teams[1]);
      teamService.getReturnValuesMap.set(teams[2].id, teams[2]);
      teamService.getReturnValuesMap.set(teams[3].id, teams[3]);
      teamService.getListReturnValues.push([
        teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]],
        [teams[0], teams[1], teams[2], teams[3], teams[4], teams[5], teams[6], teams[7]]);
      fixture = TestBed.createComponent(CupCreationComponent);
      component = fixture.componentInstance;
      component.cupPhase = { ...cupPhase };
      component.cupFights = [];
      component.reloadRequest.subscribe(() => {
        reloadRequested = true;
      });
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("does not show delete cup button", () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css("#delete-cup"))).toBeFalsy();
    });

    describe("when selecting number of teams in cup phase", () => {
      it("shows exactly four position dropdowns number of teams is four", () => {
        component.cupPhase.number_of_positions = 4;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-0"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-1"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-2"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-3"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-4"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-5"))).toBeFalsy();
      });

      it("shows exactly two position dropdowns number of teams is two", () => {
        component.cupPhase.number_of_positions = 2;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-0"))).toBeFalsy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-1"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-2"))).toBeTruthy();
        expect(fixture.debugElement.query(By.css("#cup-phase-team-position-3"))).toBeFalsy();
      });
    });

    describe("when two teams are selected and 'generate cup' button is clicked", () => {
      let posInput1, posInput2, generateButton;
      const teamFightId = 5;
      let expectedTeamFight: TeamFight = {
        id: 0,
        aka_team: teams[0].id,
        shiro_team: teams[2].id,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
      }
      let expectedCupFight: CupFight = {
        id: 0,
        cup_phase: cupPhaseId,
        previous_aka_fight: null,
        previous_shiro_fight: null,
        team_fight: teamFightId
      }
      beforeEach(() => {
        teamService.getListReturnValues.push([]);
        cupFightService.addReturnIdValues = [0];
        teamFightService.addReturnIdValues.push(teamFightId);
        component.cupPhase.number_of_positions = 2;
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

      it("requests reload of cup fights", async(() => {
        fixture.whenStable().then(() => {
          expect(reloadRequested).toBeTruthy();
        });
      }));
    });

    describe("when eight teams are selected and 'generate cup' button is clicked", () => {
      let generateButton, numberOfTeamsInput;
      let expectedTeamFights: TeamFight[] = [{
        id: 0,
        aka_team: teams[0].id,
        shiro_team: teams[2].id,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
      },
      {
        id: 0,
        aka_team: teams[1].id,
        shiro_team: teams[3].id,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
      },
      {
        id: 0,
        aka_team: teams[4].id,
        shiro_team: teams[5].id,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
      },
      {
        id: 0,
        aka_team: teams[6].id,
        shiro_team: teams[7].id,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
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
        component.cupPhase.number_of_positions = 8;
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

      it("requests reload of cup fights", async(() => {
        fixture.whenStable().then(() => {
          expect(reloadRequested).toBeTruthy();
        });
      }));
    });
  });
});

function setTeamOnCupPosition(fixture: ComponentFixture<CupCreationComponent>, position: number, teamIndex: number) {
  let input = fixture.debugElement.query(By.css("#cup-phase-team-position-" + position)).nativeElement;
  input.value = input.options[teamIndex].value;
  input.dispatchEvent(new Event('change'));
}

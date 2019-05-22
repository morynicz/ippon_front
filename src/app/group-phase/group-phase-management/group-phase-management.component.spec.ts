import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPhaseManagementComponent as GroupPhaseManagementComponent } from './group-phase-management.component';
import { Tournament } from '../../tournament/tournament';
import { NumericConstraint } from '../../tournament/numeric-constraint';
import { Rank } from '../../rank';
import { SexConstraint } from '../../tournament/sex-constraint';
import { GroupPhase } from '../group-phase';
import { GroupPhaseServiceSpy } from '../group-phase.service.spy';
import { GroupPhaseService } from '../group-phase.service';
import { By } from '@angular/platform-browser';
import { GroupPhaseLineComponent } from '../group-phase-line/group-phase-line.component';
import { GroupPhaseFormComponent } from '../group-phase-form/group-phase-form.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TournamentServiceSpy } from '../../tournament/tournament.service.spy';
import { TournamentService } from '../../tournament/tournament.service';

const tournamentId: number = 9;
const tournament: Tournament = {
  id: tournamentId,
  name: "T1",
  date: new Date("2020-01-01"),
  city: "Ci1",
  address: "A1",
  team_size: 3,
  group_match_length: 4,
  ko_match_length: 5,
  final_match_length: 6,
  finals_depth: 7,
  age_constraint: NumericConstraint.GreaterOrEqual,
  age_constraint_value: 18,
  rank_constraint: NumericConstraint.Less,
  rank_constraint_value: Rank.Dan_1,
  sex_constraint: SexConstraint.MenOnly,
  description: "D1",
  webpage: "W1"
};
const groupPhases: GroupPhase[] = [{
  id: 89,
  name: "GP1",
  fight_length: 4,
  tournament: tournament.id
},
{
  id: 90,
  name: "GP2",
  fight_length: 3,
  tournament: tournament.id
}];

describe('GroupPhaseManagementComponent', () => {
  let component: GroupPhaseManagementComponent;
  let fixture: ComponentFixture<GroupPhaseManagementComponent>;
  let groupPhaseService: GroupPhaseServiceSpy;
  let tournamentService: TournamentServiceSpy;
  let html;

  beforeEach(async(() => {
    groupPhaseService = new GroupPhaseServiceSpy();
    groupPhaseService.getListReturnValues.push(groupPhases);
    tournamentService = new TournamentServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        GroupPhaseManagementComponent,
        GroupPhaseLineComponent,
        GroupPhaseFormComponent],
      providers: [{
        provide: GroupPhaseService,
        useValue: groupPhaseService
      },
      {
        provide: TournamentService,
        useValue: tournamentService
      }],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  describe("when user is not admin", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(GroupPhaseManagementComponent);
      component = fixture.componentInstance;
      component.tournamentId = tournamentId;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should display list of group phases", () => {
      expect(html.textContent).toContain(groupPhases[0].name);
      expect(html.textContent).toContain(groupPhases[1].name);
    });

    it("should check if user is admin for this tournament", () => {
      expect(tournamentService.isAuthorizedValue).toBe(tournamentId);
    });

    it("should not display group phase destruction buttons", () => {
      expect(fixture.debugElement.query(By.css("#delete-group-phase")) == null).toBeTruthy();
    });

    it("should not display group phase creation form", () => {
      expect(fixture.debugElement.query(By.css("#create-group-phase")) == null).toBeTruthy();
    });
  });

  describe("when user is admin", () => {
    beforeEach(() => {
      tournamentService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(GroupPhaseManagementComponent);
      component = fixture.componentInstance;
      component.tournamentId = tournamentId;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should display group phase destruction buttons", () => {
      expect(fixture.debugElement.query(By.css("#delete-group-phase"))).toBeTruthy();
    });

    it("should display group phase creation form", () => {
      expect(fixture.debugElement.query(By.css("#create-group-phase"))).toBeTruthy();
    });

    describe("when group phase deletion button is clicked", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#delete-group-phase"));
        groupPhaseService.getListValue = [];
        btn.nativeElement.click();
      });

      it("should reload group phases through groupPhase service", () => {
        expect(groupPhaseService.getListValue).toEqual([tournamentId]);
      })
    });

    describe("when groupPhase creation button is pressed", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#save-group-phase"));
        groupPhaseService.getListValue = [];
        btn.nativeElement.click();
      });
      it("should reload group phases through groupPhase service", () => {
        expect(groupPhaseService.getListValue).toEqual([tournamentId]);
      });
    });
  });
});

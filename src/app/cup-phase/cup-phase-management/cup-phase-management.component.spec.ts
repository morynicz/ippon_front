import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPhaseManagementComponent } from './cup-phase-management.component';
import { Tournament } from '../../tournament/tournament';
import { NumericConstraint } from '../../tournament/numeric-constraint';
import { Rank } from '../../rank';
import { SexConstraint } from '../../tournament/sex-constraint';
import { CupPhase } from '../cup-phase';
import { CupPhaseLineComponent } from '../cup-phase-line/cup-phase-line.component';
import { CupPhaseFormComponent } from '../cup-phase-form/cup-phase-form.component';
import { CupPhaseService } from '../cup-phase.service';
import { TournamentService } from '../../tournament/tournament.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CupPhaseServiceSpy } from '../cup-phase.service.spy';
import { TournamentServiceSpy } from '../../tournament/tournament.service.spy';
import { By } from '@angular/platform-browser';


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

const cupPhases: CupPhase[] = [{
  tournament: tournamentId,
  id: 98564,
  fight_length: 5,
  final_fight_length: 10,
  name: "cp1"
},
{
  tournament: tournamentId,
  id: 9284,
  fight_length: 5,
  final_fight_length: 10,
  name: "cp2"
}];

describe('CupPhaseManagementComponent', () => {
  let component: CupPhaseManagementComponent;
  let fixture: ComponentFixture<CupPhaseManagementComponent>;
  let cupPhaseService: CupPhaseServiceSpy;
  let tournamentService: TournamentServiceSpy;
  let html;

  beforeEach(async(() => {
    cupPhaseService = new CupPhaseServiceSpy();
    cupPhaseService.getListReturnValues.push(cupPhases);
    tournamentService = new TournamentServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        CupPhaseManagementComponent,
        CupPhaseLineComponent,
        CupPhaseFormComponent],
      providers: [{
        provide: CupPhaseService,
        useValue: cupPhaseService
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
      fixture = TestBed.createComponent(CupPhaseManagementComponent);
      component = fixture.componentInstance;
      component.tournamentId = tournamentId;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should display list of cup phases", () => {
      expect(html.textContent).toContain(cupPhases[0].name);
      expect(html.textContent).toContain(cupPhases[1].name);
    });

    it("should check if user is admin for this tournament", () => {
      expect(tournamentService.isAuthorizedValue).toBe(tournamentId);
    });

    it("should not display cup phase destruction buttons", () => {
      expect(fixture.debugElement.query(By.css("#delete-cup-phase")) == null).toBeTruthy();
    });

    it("should not display cup phase creation form", () => {
      expect(fixture.debugElement.query(By.css("#create-cup-phase")) == null).toBeTruthy();
    });
  });

  describe("when user is admin", () => {
    beforeEach(() => {
      tournamentService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(CupPhaseManagementComponent);
      component = fixture.componentInstance;
      component.tournamentId = tournamentId;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should display cup phase destruction buttons", () => {
      expect(fixture.debugElement.query(By.css("#delete-cup-phase"))).toBeTruthy();
    });

    it("should display cup phase creation form", () => {
      expect(fixture.debugElement.query(By.css("#create-cup-phase"))).toBeTruthy();
    });

    describe("when cup phase deletion button is clicked", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#delete-cup-phase"));
        cupPhaseService.getListValue = [];
        btn.nativeElement.click();
      });

      it("should reload cup phases through cupPhase service", () => {
        expect(cupPhaseService.getListValue).toEqual([tournamentId]);
      })
    });

    describe("when cupPhase creation button is pressed", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#save-cup-phase"));
        cupPhaseService.getListValue = [];
        btn.nativeElement.click();
      });
      it("should reload cup phases through cupPhase service", () => {
        expect(cupPhaseService.getListValue).toEqual([tournamentId]);
      });
    });
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TournamentFullComponent } from './tournament-full.component';
import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Rank } from '../../rank';
import { KendoRankPipe } from '../../player/kendo-rank.pipe';
import { NumericConstraintPipe } from '../numeric-constraint.pipe';
import { SexConstraintPipe } from '../sex-constraint.pipe';
import { TournamentServiceSpy } from '../tournament.service.spy';
import { GroupPhase } from '../../group-phase/group-phase';
import { GroupPhaseService } from '../../group-phase/group-phase.service';
import { GroupPhaseServiceSpy } from '../../group-phase/group-phase.service.spy';
import { GroupPhaseLineComponent } from '../../group-phase/group-phase-line/group-phase-line.component';
import { GroupPhaseFormComponent } from '../../group-phase/group-phase-form/group-phase-form.component';
import { FormsModule } from '@angular/forms';
import { GroupPhaseManagementComponent } from '../../group-phase/group-phase-management/group-phase-management.component';
import { CupPhase } from '../../cup-phase/cup-phase';
import { CupPhaseManagementComponent } from '../../cup-phase/cup-phase-management/cup-phase-management.component';
import { CupPhaseLineComponent } from '../../cup-phase/cup-phase-line/cup-phase-line.component';
import { CupPhaseFormComponent } from '../../cup-phase/cup-phase-form/cup-phase-form.component';
import { CupPhaseServiceSpy } from '../../cup-phase/cup-phase.service.spy';
import { CupPhaseService } from '../../cup-phase/cup-phase.service';

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

const cupPhases: CupPhase[] = [{
  tournament: tournamentId,
  id: 98564,
  fight_length: 5,
  final_fight_length: 10,
  name: "cp1",
  number_of_positions: 16
},
{
  tournament: tournamentId,
  id: 9284,
  fight_length: 5,
  final_fight_length: 10,
  name: "cp2",
  number_of_positions: 4
}];

describe('TournamentFullComponent', () => {
  let component: TournamentFullComponent;
  let fixture: ComponentFixture<TournamentFullComponent>;
  let tournamentService: TournamentServiceSpy;
  let groupPhaseService: GroupPhaseServiceSpy;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    tournamentService = new TournamentServiceSpy();
    //triple dots give copy, so the test cannot modify const
    tournamentService.getReturnValues.push({ ...tournament });
    groupPhaseService = new GroupPhaseServiceSpy();
    groupPhaseService.getListReturnValues.push(groupPhases);
    cupPhaseService = new CupPhaseServiceSpy();
    cupPhaseService.getListReturnValues.push(cupPhases);
    TestBed.configureTestingModule({
      declarations: [
        TournamentFullComponent,
        GroupPhaseLineComponent,
        NumericConstraintPipe,
        KendoRankPipe,
        SexConstraintPipe,
        GroupPhaseFormComponent,
        GroupPhaseManagementComponent,
        CupPhaseLineComponent,
        CupPhaseFormComponent,
        CupPhaseManagementComponent
      ],
      providers: [
        {
          provide: TournamentService,
          useValue: tournamentService
        },
        {
          provide: GroupPhaseService,
          useValue: groupPhaseService
        },
        {
          provide: CupPhaseService,
          useValue: cupPhaseService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: tournamentId })
            }
          }
        }
      ],
      imports: [RouterTestingModule, FormsModule],
    })
      .compileComponents();
  }));

  describe("when user is not admin", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should check if user is admin', () => {
      expect(tournamentService.isAuthorizedValue).toEqual(tournamentId);
    });

    it('should display all tournament details', () => {
      expect(html.textContent).toContain('T1');
      expect(html.textContent).toContain('Ci1');
      expect(html.textContent).toContain("2020-01-01");
      expect(html.textContent).toContain('W1');
      expect(html.textContent).toContain('D1');
      expect(html.textContent).toContain('A1');
      expect(html.textContent).toContain('>= 18');
      expect(html.textContent).toContain('< 1 Dan');
      expect(html.textContent).toContain('men only');
      expect(html.textContent).toContain('3');
      expect(html.textContent).toContain('4');
      expect(html.textContent).toContain('5');
      expect(html.textContent).toContain('6');
    });

    it('should not display age constraint info if age constraint is none', () => {
      component.tournament.age_constraint = NumericConstraint.None;
      fixture.detectChanges();
      expect(html.textContent).not.toContain('Age');
    });

    it('should not display rank constraint info if rank constraint is none', () => {
      component.tournament.rank_constraint = NumericConstraint.None;
      fixture.detectChanges();
      expect(html.textContent).not.toContain('Rank');
    });

    it('should not display sex constraint info if sex constraint is none', () => {
      component.tournament.age_constraint = NumericConstraint.None;
      fixture.detectChanges();
      expect(html.textContent).not.toContain('sex constraints');
    });

    it('should not display team size info if teams size is 1', () => {
      component.tournament.team_size = 1;
      fixture.detectChanges();
      expect(html.textContent).not.toContain('team size');
    });

    it('should not display admin controls if the user is not tournament admin', () => {
      tournamentService.isAuthorizedReturnValue = true;
      fixture.detectChanges();
      const de = fixture.debugElement;
      const html = de.nativeElement;
      expect(html.querySelector('#delete-tournament')).toBeFalsy();
      expect(html.querySelector('#edit-tournament')).toBeFalsy();
      expect(html.querySelector('#edit-participants')).toBeFalsy();
      expect(html.querySelector('#edit-admins')).toBeFalsy();
    });

    it("should display link to teams", () => {
      const link = fixture.debugElement.query(By.css('#view-teams'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/tournament/' + tournament.id + '/teams');
    });

    it("should display list of group phases", () => {
      expect(html.textContent).toContain(groupPhases[0].name);
      expect(html.textContent).toContain(groupPhases[1].name);
    });

    it("should not display group phase destruction buttons", () => {
      expect(fixture.debugElement.query(By.css("#delete-group-phase")) == null).toBeTruthy();
    });

    it("should not display group phase creation form", () => {
      expect(fixture.debugElement.query(By.css("#create-group-phase")) == null).toBeTruthy();
    });

    it("should display list of cup phases", () => {
      expect(html.textContent).toContain(cupPhases[0].name);
      expect(html.textContent).toContain(cupPhases[1].name);
    });
  });

  describe("when user is admin", () => {
    beforeEach(() => {
      tournamentService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(TournamentFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should display admin controls if the user is tournament admin', () => {
      fixture.detectChanges();
      const de = fixture.debugElement;
      const html = de.nativeElement;
      expect(html.querySelector('#delete-tournament')).toBeTruthy();
      expect(html.querySelector('#edit-participants')).toBeTruthy();
      expect(html.querySelector('#edit-tournament')).toBeTruthy();
      expect(html.querySelector('#edit-admins')).toBeTruthy();
    });

    describe("when group phase deletion button is clicked", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#delete-group-phase"));
        groupPhaseService.getListValues = [];
        btn.nativeElement.click();
      });

      it("should reload group phases through groupPhase service", () => {
        expect(groupPhaseService.getListValues).toEqual([tournamentId]);
      })
    });

    describe("when groupPhase creation button is pressed", () => {
      let btn;
      beforeEach(() => {
        btn = fixture.debugElement.query(By.css("#save-group-phase"));
        groupPhaseService.getListValues = [];
        btn.nativeElement.click();
      });
      it("should reload group phases through groupPhase service", () => {
        expect(groupPhaseService.getListValues).toEqual([tournamentId]);
      });
    });
  });
});

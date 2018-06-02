import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentFullComponent } from './tournament-full.component';
import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Rank } from '../../rank';
import { KendoRankPipe } from '../../player/kendo-rank.pipe';
import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

import { NumericConstraintPipe } from '../numeric-constraint.pipe';
import { SexConstraintPipe } from '../sex-constraint.pipe';

const tournamentId: number = 9;

class TournamentServiceSpy {
  tournament: Tournament = {
    id: 0,
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
  getTournamentCallArgument: number;
  getTournament(id: number): Observable<Tournament> {
    this.getTournamentCallArgument = id;
    return of(this.tournament);
  }
}

class AuthorizationServiceDummy {
  isTournamentAdminResult: boolean = false;
  isTournamentAdminCallArgument: number = -1;
  isTournamentAdmin(clubId: number): Observable<boolean> {
    this.isTournamentAdminCallArgument = tournamentId;
    return of(this.isTournamentAdminResult);
  }
}

describe('TournamentFullComponent', () => {
  let component: TournamentFullComponent;
  let fixture: ComponentFixture<TournamentFullComponent>;
  let authorizationService: AuthorizationServiceDummy;
  let tournamentService: TournamentServiceSpy;
  let html;

  describe("when user is not admin", () => {
    beforeEach(async(() => {
      tournamentService = new TournamentServiceSpy();
      authorizationService = new AuthorizationServiceDummy();
      TestBed.configureTestingModule({
        declarations: [
          TournamentFullComponent,
          NumericConstraintPipe,
          KendoRankPipe,
          SexConstraintPipe
        ],
        providers: [
          {
            provide: TournamentService,
            useValue: tournamentService
          },
          {
            provide: AuthorizationService,
            useValue: authorizationService
          },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: tournamentId })
              }
            }
          }
        ],
        imports: [RouterTestingModule],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
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

    it('should display admin controls if the user is club admin', () => {
      authorizationService.isClubAdminResult = true;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement;
        const html = de.nativeElement;
        expect(html.querySelector('#delete-tournament')).toBeFalsy();
        expect(html.querySelector('#edit-tournament')).toBeFalsy();
      });
    });
  });

  describe("when user is admin", () => {
    beforeEach(async(() => {
      tournamentService = new TournamentServiceSpy();
      authorizationService = new AuthorizationServiceDummy();
      authorizationService.isTournamentAdminResult = true;
      TestBed.configureTestingModule({
        declarations: [
          TournamentFullComponent,
          NumericConstraintPipe,
          KendoRankPipe,
          SexConstraintPipe
        ],
        providers: [
          {
            provide: TournamentService,
            useValue: tournamentService
          },
          {
            provide: AuthorizationService,
            useValue: authorizationService
          },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: tournamentId })
              }
            }
          }
        ],
        imports: [RouterTestingModule],
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should display admin controls if the user is club admin', () => {
      authorizationService.isClubAdminResult = true;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement;
        const html = de.nativeElement;
        expect(html.querySelector('#delete-tournament')).toBeTruthy();
        expect(html.querySelector('#edit-tournament')).toBeTruthy();
      });
    });


  });
});

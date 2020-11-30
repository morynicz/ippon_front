import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentListComponent } from './tournament-list.component';
import { TournamentLineComponent } from '../tournament-line/tournament-line.component';
import { Tournament } from '../tournament';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Rank } from '../../rank';
import { AuthenticationService } from '../../authorization/authentication.service';
import { TournamentService } from '../tournament.service';
import { TournamentServiceSpy } from '../tournament.service.spy';

class AuthenticationServiceSpy {
  isLoggedInResult: boolean = false;
  isLoggedInCalled: boolean = false;
  isLoggedIn(): Observable<boolean> {
    this.isLoggedInCalled = true;
    return of(this.isLoggedInResult);
  }
}

describe('TournamentListComponent', () => {
  const tournaments: Tournament[] = [
    {
      id: 0,
      name: "T1",
      date: new Date("2020-01-01"),
      city: "Ci1",
      address: "A1",
      team_size: 3,
      group_match_length: 3,
      ko_match_length: 4,
      final_match_length: 5,
      finals_depth: 2,
      age_constraint: NumericConstraint.None,
      age_constraint_value: 0,
      rank_constraint: NumericConstraint.None,
      rank_constraint_value: Rank.Kyu_5,
      sex_constraint: SexConstraint.None,
      description: "d1",
      webpage: "w1"
    },
    {
      id: 1,
      name: "T2",
      date: new Date("2022-02-02"),
      city: "Ci2",
      address: "A2",
      team_size: 4,
      group_match_length: 5,
      ko_match_length: 6,
      final_match_length: 7,
      finals_depth: 1,
      age_constraint: NumericConstraint.None,
      age_constraint_value: 0,
      rank_constraint: NumericConstraint.None,
      rank_constraint_value: Rank.Kyu_5,
      sex_constraint: SexConstraint.None,
      description: "d3",
      webpage: "w5"
    }
  ];

  let component: TournamentListComponent;
  let fixture: ComponentFixture<TournamentListComponent>;
  let tournamentService: TournamentServiceSpy;
  let authenticationService: AuthenticationServiceSpy;

  beforeEach(waitForAsync(() => {
    tournamentService = new TournamentServiceSpy();
    tournamentService.getListReturnValues.push(tournaments);
    authenticationService = new AuthenticationServiceSpy();

    TestBed.configureTestingModule({
      declarations: [TournamentListComponent, TournamentLineComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: TournamentService, useValue: tournamentService },
        { provide: AuthenticationService, useValue: authenticationService }
      ]
    })
      .compileComponents();
  }));

  describe("when user is not logged in", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load tournaments using tournament.service on init', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(tournamentService.getListValue).toBeTruthy();
      });
    }));

    it('should display loaded tournaments', waitForAsync(() => {
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const tournamentLines = html.querySelectorAll('ippon-tournament-line');

        expect(tournamentLines[0].textContent).toContain('T1');
        expect(tournamentLines[0].textContent).toContain('Ci1');
        expect(tournamentLines[0].textContent).toContain('2020-01-01');
        expect(tournamentLines[1].textContent).toContain('T2');
        expect(tournamentLines[1].textContent).toContain('Ci2');
        expect(tournamentLines[1].textContent).toContain('2022-02-02');
      });
    }));

    it('should not display "add Tournament" button if user not signed in', waitForAsync(() => {
      authenticationService.isLoggedInResult = false;
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const button = html.querySelector('button');

        expect(button).toBeFalsy();
      });
    }));
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      authenticationService.isLoggedInResult = true;
      fixture = TestBed.createComponent(TournamentListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should should display "add Tournament" button if auth service isLoggedIn returns true', waitForAsync(() => {
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const button = html.querySelector('button');

        expect(authenticationService.isLoggedInCalled).toBeTruthy();
        expect(button).toBeTruthy();
      });
    }));
  });
});

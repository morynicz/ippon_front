import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

class TournamentServiceSpy {
  getTournamentsCalled: boolean = false;
  getTournamentsResult: Tournament[];
  getTournaments(): Observable<Tournament[]> {
    this.getTournamentsCalled = true;
    return of(this.getTournamentsResult);
  }
}

class AuthenticationServiceSpy {
  isLoggedInResult: boolean = false;
  isLoggedInCalled: boolean = false;
  isLoggedIn(): boolean {
    this.isLoggedInCalled = true;
    return this.isLoggedInResult;
  }
}

describe('TournamentListComponent', () => {
  let component: TournamentListComponent;
  let fixture: ComponentFixture<TournamentListComponent>;
  let tournamentService: TournamentServiceSpy;
  let authenticationService: AuthenticationServiceSpy;

  beforeEach(async(() => {
    tournamentService = new TournamentServiceSpy();
    tournamentService.getTournamentsResult = [
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

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tournaments using tournament.service on init', async(() => {
    fixture.whenStable().then(() => {
      expect(tournamentService.getTournamentsCalled).toBeTruthy();
    });
  }));

  it('should display loaded tournaments', async(() => {
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

  it('should not display "add Tournament" button if user not signed in', async(() => {
    authenticationService.isLoggedInResult = false;
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const button = html.querySelector('button');

      expect(button).toBeFalsy();
    });
  }));

  it('should should display "add Tournament" button if auth service isLoggedIn returns true', async(() => {
    authenticationService.isLoggedInResult = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const button = html.querySelector('button');

      expect(authenticationService.isLoggedInCalled).toBeTruthy();
      expect(button).toBeTruthy();
    });
  }));
});

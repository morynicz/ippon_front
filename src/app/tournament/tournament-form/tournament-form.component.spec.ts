import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location, DatePipe } from '@angular/common';

import { TournamentFormComponent } from './tournament-form.component';
import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { TournamentServiceSpy } from '../tournament.service.spy';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Rank } from '../../rank';

import { KendoRankPipe } from '../../player/kendo-rank.pipe';
import { NumericConstraintPipe } from '../numeric-constraint.pipe';
import { SexConstraintPipe } from '../sex-constraint.pipe';
import { LocationSpy } from '../../test-utils/location.spy';

const tournament: Tournament = {
  id: 7,
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
};

function expectTournamentsToBeEqual(
  value: Tournament,
  expected: Tournament
) {
  expect(value.id).toBe(expected.id);
  expect(value.name).toBe(expected.name);
  expect(value.date).toBe(expected.date);
  expect(value.city).toBe(expected.city);
  expect(value.address).toBe(expected.address);
  expect(value.team_size).toBe(expected.team_size);
  expect(value.group_match_length).toBe(expected.group_match_length);
  expect(value.ko_match_length).toBe(expected.ko_match_length);
  expect(value.final_match_length).toBe(expected.final_match_length);
  expect(value.finals_depth).toBe(expected.finals_depth);
  expect(value.age_constraint).toBe(expected.age_constraint);
  expect(value.age_constraint_value).toBe(expected.age_constraint_value);
  expect(value.rank_constraint).toBe(expected.rank_constraint);
  expect(value.rank_constraint_value).toBe(expected.rank_constraint_value);
  expect(value.sex_constraint).toBe(expected.sex_constraint);
  expect(value.description).toBe(expected.description);
  expect(value.webpage).toBe(expected.webpage);
}

describe('TournamentFormComponent', () => {
  let component: TournamentFormComponent;
  let fixture: ComponentFixture<TournamentFormComponent>;
  let tournamentService: TournamentServiceSpy;
  let location: LocationSpy;

  describe('when tournament id is available', () => {
    beforeEach(waitForAsync(() => {
      tournamentService = new TournamentServiceSpy();
      tournamentService.getReturnValues.push(tournament);
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [
          TournamentFormComponent,
          SexConstraintPipe,
          NumericConstraintPipe,
          KendoRankPipe
        ],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: TournamentService, useValue: tournamentService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: tournament.id })
              }
            }
          },
          { provide: Location, useValue: location }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load name of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=name]")).nativeElement.value)
            .toContain(tournament.name);
        });
      }));

    it('should load description of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=description]")).nativeElement.value)
            .toContain(tournament.description);
        });
      }));

    it('should load webpage of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=webpage]")).nativeElement.value)
            .toContain(tournament.webpage);
        });
      }));

    it('should load city of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=city]")).nativeElement.value)
            .toContain(tournament.city);
        });
      }));
    it('should load date of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          let pipe = new DatePipe('en');
          expect(de.query(By.css("[name=date]")).nativeElement.value)
            .toContain(pipe.transform(tournament.date, 'yyyy-MM-dd'));
        });
      }));

    it('should load rank constraint of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=rank-constraint]")).nativeElement.value)
            .toContain(tournament.rank_constraint);
        });
      }));

    it('should load rank constraint value of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=rank-constraint-value]")).nativeElement.value)
            .toContain(tournament.rank_constraint_value);
        });
      }));

    it('should load age constraint of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=age-constraint]")).nativeElement.value)
            .toContain(tournament.age_constraint);
        });
      }));

    it('should load age constraint value of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=age-constraint-value]")).nativeElement.value)
            .toContain(tournament.age_constraint_value);
        });
      }));

    it('should load sex constraint of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=sex-constraint]")).nativeElement.value)
            .toContain(tournament.sex_constraint);
        });
      }));

    it('should load team size of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=team-size]")).nativeElement.value)
            .toContain(tournament.team_size);
        });
      }));

    it('should load ko match length of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=ko-match-length]")).nativeElement.value)
            .toContain(tournament.ko_match_length);
        });
      }));

    it('should load group match length of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=group-match-length]")).nativeElement.value)
            .toContain(tournament.group_match_length);
        });
      }));

    it('should load final match length of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=final-match-length]")).nativeElement.value)
            .toContain(tournament.final_match_length);
        });
      }));

    it('should load finals depth of tournament with given id',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=finals-depth]")).nativeElement.value)
            .toContain(tournament.finals_depth);
        });
      }));


    describe('when form is filled out and submit clicked',
      () => {
        let expectedTournament: Tournament;
        let btn;
        beforeEach(waitForAsync(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-tournament"));
          expectedTournament = {
            id: 2,
            name: "T2",
            date: new Date("2023-03-03"),
            city: "Ci2",
            address: "A2",
            team_size: 4,
            group_match_length: 5,
            ko_match_length: 6,
            final_match_length: 7,
            finals_depth: 8,
            age_constraint: NumericConstraint.Less,
            age_constraint_value: 30,
            rank_constraint: NumericConstraint.Greater,
            rank_constraint_value: Rank.Dan_3,
            sex_constraint: SexConstraint.MenOnly,
            description: "D2",
            webpage: "W2"
          };
          component.tournament = expectedTournament;
          fixture.detectChanges();
          btn.nativeElement.click();
          fixture.detectChanges();
        }));
        it('should call tournament service updateTournament with tournament values set in form',
          waitForAsync(() => {
            fixture.whenStable().then(() => {
              expectTournamentsToBeEqual(tournamentService.updateValue, expectedTournament);
            });
          }));
        it('should go back to previous location', waitForAsync(() => {
          fixture.whenStable().then(() => {
            expect(location.clicked).toBeTruthy();
          });
        }));
      });
  });

  describe('when tournament id is not available', () => {
    beforeEach(waitForAsync(() => {
      tournamentService = new TournamentServiceSpy();
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [
          TournamentFormComponent,
          SexConstraintPipe,
          NumericConstraintPipe,
          KendoRankPipe
        ],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: TournamentService, useValue: tournamentService },
          { provide: Location, useValue: location }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should prepare a new tournament instead of trying to get it from tournament service',
      waitForAsync(() => {
        expect(tournamentService.getValues).not.toEqual([0]);
        expectTournamentsToBeEqual(component.tournament, new Tournament());
      }));

    describe('when form is filled out and submit clicked',
      () => {
        let expectedTournament: Tournament;
        let btn;
        beforeEach(waitForAsync(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-tournament"));
          expectedTournament = {
            id: 2,
            name: "T2",
            date: new Date("2023-03-03"),
            city: "Ci2",
            address: "A2",
            team_size: 4,
            group_match_length: 5,
            ko_match_length: 6,
            final_match_length: 7,
            finals_depth: 8,
            age_constraint: NumericConstraint.Less,
            age_constraint_value: 30,
            rank_constraint: NumericConstraint.Greater,
            rank_constraint_value: Rank.Dan_3,
            sex_constraint: SexConstraint.MenOnly,
            description: "D2",
            webpage: "W2"
          };
          component.tournament = expectedTournament;
          fixture.detectChanges();
          btn.nativeElement.click();
          fixture.detectChanges();
        }));
        it('should call tournament service createTournament with tournament values set in form',
          waitForAsync(() => {
            fixture.whenStable().then(() => {
              expectTournamentsToBeEqual(tournamentService.addValue, expectedTournament);
            });
          }));
        it('should go back to previous location', waitForAsync(() => {
          fixture.whenStable().then(() => {
            expect(location.clicked).toBeTruthy();
          });
        }));
      });
  });
});

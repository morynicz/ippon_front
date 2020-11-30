import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { TournamentLineComponent } from './tournament-line.component';
import { Tournament } from '../tournament';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Rank } from '../../rank';

describe('TournamentLineComponent', () => {
  let component: TournamentLineComponent;
  let fixture: ComponentFixture<TournamentLineComponent>;
  let expectedTournament: Tournament;
  let html;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TournamentLineComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentLineComponent);
    component = fixture.componentInstance;

    expectedTournament = {
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
    };

    component.tournament = expectedTournament;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("when created", () => {
    it('should display tournament name', () => {
      expect(html.textContent).toContain('T1');
    });

    it('should display tournament city', () => {
      expect(html.textContent).toContain('Ci1');
    });

    it('should display tournament date', () => {
      expect(html.textContent).toContain('2020-01-01');
    });

    it('should provide link to the tournament', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/tournament/' + expectedTournament.id);
    });
  });
});

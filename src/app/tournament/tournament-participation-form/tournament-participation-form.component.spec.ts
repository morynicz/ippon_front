import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { TournamentParticipationFormComponent } from './tournament-participation-form.component';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentParticipantService } from '../tournament-participant.service';
import { Player } from '../../player/player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { TournamentParticipation } from '../tournament-participation';
import { TournamentParticipantServiceSpy } from '../tournament-participant.service.spy';

const participation: TournamentParticipation = {
  id: 1,
  tournament_id: 1,
  player: {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 1,
    id: 1
  },
  is_paid: true,
  is_registered: false,
  is_sex_ok: true,
  is_age_ok: false,
  is_rank_ok: true,
  is_qualified: false,
  notes: "N1"
};

const participation2: TournamentParticipation = {
  id: 2,
  tournament_id: 2,
  player: {
    name: 'P2',
    surname: 'S2',
    sex: Sex.Female,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_1,
    club_id: 2,
    id: 2
  },
  is_paid: true,
  is_registered: false,
  is_sex_ok: true,
  is_age_ok: false,
  is_rank_ok: true,
  is_qualified: false,
  notes: "N2"
};

describe('TournamentParticipationFormComponent', () => {
  let component: TournamentParticipationFormComponent;
  let fixture: ComponentFixture<TournamentParticipationFormComponent>;
  let html;
  let tournamentParticipantService: TournamentParticipantServiceSpy;
  let location: Location;

  beforeEach(async(() => {
    tournamentParticipantService = new TournamentParticipantServiceSpy();
    tournamentParticipantService.updateParticipationReturnValue = participation;
    TestBed.configureTestingModule({
      declarations: [TournamentParticipationFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: TournamentParticipantService, useValue: tournamentParticipantService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipationFormComponent);
    component = fixture.componentInstance;
    component.participation = participation;
    fixture.detectChanges();

    html = fixture.debugElement.nativeElement;
  });

  describe("When component is created", () => {
    it("should display player name and surname", () => {
      expect(html.textContent).toContain(participation.player.name);
      expect(html.textContent).toContain(participation.player.surname);
    });
    it("should display notes", () => {
      fixture.whenStable().then(() => {
        expect(html.innerHTML).toContain(participation.notes);
      });
    });
    it("should have paid checkbox set to true", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('[name=is_paid]')).nativeElement.checked).toBe(true);
      });
    });
    it("should have registered checkbox set to false", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('[name=is_registered]')).nativeElement.checked).toBe(false);
      });
    });
    it("should have qualified checkbox set to false", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('[name=is_qualified]')).nativeElement.checked).toBe(false);
      });
    });
    it("should display age X", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('#is_age_ok')).nativeElement.textContent).toContain('X');
      });
    });
    it("should display sex OK", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('#is_sex_ok')).nativeElement.textContent).toContain('OK');
      });
    });
    it("should display rank OK", () => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('#is_rank_ok')).nativeElement.textContent).toContain('OK');
      });
    });
  });

  describe("when update button is clicked", () => {
    let btn;
    beforeEach(async(() => {
      component.participation = participation2;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#save-participation"));
      btn.nativeElement.click();
    }));
    it("should call participation service update with set participation", () => {
      fixture.whenStable().then(() => {
        expect(tournamentParticipantService.updateParticiaptionValue).toBe(participation2);
      });
    });
    it("should set the participation to value returned from update call",
      () => {
        fixture.whenStable().then(() => {
          expect(component.participation).toBe(participation);
        });
      });
  });

  describe("when delete button is clicked", () => {
    let btn;
    let requested: boolean;
    beforeEach(async(() => {
      component.participation = participation2;
      requested = false;
      fixture.detectChanges();
      component.reloadRequest.subscribe(req => {
        requested = true;
      });
      btn = fixture.debugElement.query(By.css("#delete-participation"));
      btn.nativeElement.click();
    }));
    it("should call participation service delete with set participation", () => {
      fixture.whenStable().then(() => {
        expect(tournamentParticipantService.deleteParticipationValue).toBe(participation2);
      });
    });
    it("should request reloading participations",
      async(() => {
        fixture.whenStable().then(() => {
          expect(requested).toBe(true);
        });
      }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

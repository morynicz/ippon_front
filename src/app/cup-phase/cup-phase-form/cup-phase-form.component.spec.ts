import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPhaseFormComponent } from './cup-phase-form.component';
import { CupPhase } from '../cup-phase';
import { CupPhaseServiceSpy } from '../cup-phase.service.spy';
import { CupPhaseService } from '../cup-phase.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

const tournamentId: number = 32;
const cupPhaseId: number = 567;
const cupPhase: CupPhase = {
  tournament: tournamentId,
  id: cupPhaseId,
  fight_length: 5,
  final_fight_length: 10,
  name: "cp1"
}

describe('CupPhaseFormComponent', () => {
  let component: CupPhaseFormComponent;
  let fixture: ComponentFixture<CupPhaseFormComponent>;
  let cupPhaseService: CupPhaseServiceSpy;
  let injectedCupPhase: CupPhase;

  beforeEach(async(() => {
    cupPhaseService = new CupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [CupPhaseFormComponent],
      providers: [
        { provide: CupPhaseService, useValue: cupPhaseService }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupPhaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injectedCupPhase = new CupPhase();
    injectedCupPhase.id = cupPhaseId;
    injectedCupPhase.tournament = tournamentId;
  });

  describe("when name is written and create button is pushed", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      btn = fixture.debugElement.query(By.css("#save-cup-phase"));
      component.cupPhase = injectedCupPhase;
      component.cupPhase.name = cupPhase.name;
      component.cupPhase.fight_length = cupPhase.fight_length;
      component.cupPhase.final_fight_length = cupPhase.final_fight_length;
      btn.nativeElement.click();

    });

    it("should create a cup phase with given parameters", () => {
      expect(cupPhaseService.addValue.name).toBe(cupPhase.name);
      expect(cupPhaseService.addValue.fight_length).toBe(cupPhase.fight_length);
      expect(cupPhaseService.addValue.final_fight_length).toBe(cupPhase.final_fight_length);
      expect(cupPhaseService.addValue.tournament).toBe(cupPhase.tournament);
      expect(cupPhaseService.addValue.id).toBe(cupPhase.id);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });
});

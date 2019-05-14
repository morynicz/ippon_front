import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPhaseLineComponent } from './cup-phase-line.component';
import { CupPhase } from '../cup-phase';
import { CupPhaseServiceSpy } from '../cup-phase.service.spy';
import { CupPhaseService } from '../cup-phase.service';
import { RouterTestingModule } from '@angular/router/testing';
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

describe('CupPhaseLineComponent', () => {
  let component: CupPhaseLineComponent;
  let fixture: ComponentFixture<CupPhaseLineComponent>;
  let cupPhaseService: CupPhaseServiceSpy;
  let html;

  beforeEach(async(() => {
    cupPhaseService = new CupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [CupPhaseLineComponent],
      providers: [
        {
          provide: CupPhaseService, useValue: cupPhaseService
        }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupPhaseLineComponent);
    component = fixture.componentInstance;
    component.cupPhase = cupPhase;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should display cup phase name', () => {
    expect(html.textContent).toContain('cp1');
  });

  it('should display cup phase fight length', () => {
    expect(html.textContent).toContain('5');
  });

  it('should display cup phase final fight length', () => {
    expect(html.textContent).toContain('10');
  });

  it('should provide link to the cup phase', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
      .toBe('/cup-phases/' + cupPhase.id);
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-cup-phase')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.cupPhase = cupPhase;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-cup-phase"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for point to cupPhase.service",
      () => {
        expect(cupPhaseService.deleteValue).toEqual(cupPhase);
      });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });
  });
});

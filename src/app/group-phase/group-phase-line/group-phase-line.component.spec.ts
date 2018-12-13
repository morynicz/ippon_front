import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPhaseLineComponent } from './group-phase-line.component';
import { GroupPhaseService } from '../group-phase.service';
import { GroupPhaseServiceSpy } from '../group-phase.service.spy';
import { GroupPhase } from '../group-phase';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const tournamentId: number = 32;
const groupPhaseId: number = 567;
const groupPhase: GroupPhase = {
  tournament: tournamentId,
  id: groupPhaseId,
  fight_length: 5,
  name: "gp1"
}

describe('GroupPhaseLineComponent', () => {
  let component: GroupPhaseLineComponent;
  let fixture: ComponentFixture<GroupPhaseLineComponent>;
  let groupPhaseService: GroupPhaseServiceSpy;
  let html;

  beforeEach(async(() => {
    groupPhaseService = new GroupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [GroupPhaseLineComponent],
      providers: [
        {
          provide: GroupPhaseService, useValue: groupPhaseService
        }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPhaseLineComponent);
    component = fixture.componentInstance;
    component.groupPhase = groupPhase;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should display group phase name', () => {
    expect(html.textContent).toContain('gp1');
  });

  it('should display group phase fight length', () => {
    expect(html.textContent).toContain('5');
  });

  it('should provide link to the group phase', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
      .toBe('/group-phases/' + groupPhase.id);
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-group-phase')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.groupPhase = groupPhase;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-group-phase"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for point to groupPhase.service",
      () => {
        expect(groupPhaseService.deleteValue).toEqual(groupPhase);
      });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });
  });
});
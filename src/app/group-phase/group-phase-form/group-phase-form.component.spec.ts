import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPhaseFormComponent } from './group-phase-form.component';
import { GroupPhase } from '../group-phase';
import { GroupPhaseServiceSpy } from '../group-phase.service.spy';
import { GroupPhaseService } from '../group-phase.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

const tournamentId: number = 345;
const groupPhaseId: number = 4357;
const groupPhase: GroupPhase = {
  id: groupPhaseId,
  tournament: tournamentId,
  fight_length: 5,
  name: "GP1"
}

describe('GroupPhaseFormComponent', () => {
  let component: GroupPhaseFormComponent;
  let fixture: ComponentFixture<GroupPhaseFormComponent>;
  let groupPhaseService: GroupPhaseServiceSpy;
  let injectedGroupPhase: GroupPhase;

  beforeEach(async(() => {
    groupPhaseService = new GroupPhaseServiceSpy();
    TestBed.configureTestingModule({
      declarations: [GroupPhaseFormComponent],
      providers: [
        { provide: GroupPhaseService, useValue: groupPhaseService }
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPhaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    injectedGroupPhase = new GroupPhase();
    injectedGroupPhase.id = groupPhaseId;
    injectedGroupPhase.tournament = tournamentId;
  });

  describe("when name is written and create button is pushed", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      btn = fixture.debugElement.query(By.css("#save-group-phase"));
      component.groupPhase = injectedGroupPhase;
      component.groupPhase.name = groupPhase.name;
      component.groupPhase.fight_length = groupPhase.fight_length;
      btn.nativeElement.click();

    });

    it("should create a group phase with given parameters", () => {
      expect(groupPhaseService.addValues[0].name).toBe(groupPhase.name);
      expect(groupPhaseService.addValues[0].fight_length).toBe(groupPhase.fight_length);
      expect(groupPhaseService.addValues[0].tournament).toBe(groupPhase.tournament);
      expect(groupPhaseService.addValues[0].id).toBe(groupPhase.id);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });
});

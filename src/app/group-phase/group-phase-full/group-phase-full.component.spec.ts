import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupPhaseFullComponent } from './group-phase-full.component';
import { Group } from '../../group/group';
import { GroupPhase } from '../group-phase';
import { GroupLineComponent } from '../../group/group-line/group-line.component';
import { GroupFormComponent } from '../../group/group-form/group-form.component';
import { GroupPhaseService } from '../group-phase.service';
import { GroupPhaseServiceSpy } from '../group-phase.service.spy';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { GroupServiceSpy } from '../../group/group.service.spy';
import { GroupService } from '../../group/group.service';
import { By } from '@angular/platform-browser';

const tournamentId: number = 32;
const groupId: number = 231;
const groupPhaseId: number = 98;
const groups: Group[] = [{
  name: "G1",
  group_phase: groupPhaseId,
  id: 765
},
{
  name: "G2",
  group_phase: groupPhaseId,
  id: 9876
},
{
  name: "G3",
  group_phase: groupPhaseId,
  id: 432
}];

const groupPhase: GroupPhase = {
  id: groupPhaseId,
  tournament: tournamentId,
  fight_length: 4,
  name: "GP1"
}

describe('GroupPhaseFullComponent', () => {
  let component: GroupPhaseFullComponent;
  let fixture: ComponentFixture<GroupPhaseFullComponent>;
  let groupPhaseService: GroupPhaseServiceSpy;
  let groupService: GroupServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    groupPhaseService = new GroupPhaseServiceSpy();
    groupPhaseService.getReturnValues.push(groupPhase);
    groupService = new GroupServiceSpy();
    groupService.getListReturnValues.push(groups);
    TestBed.configureTestingModule({
      declarations: [
        GroupPhaseFullComponent,
        GroupLineComponent,
        GroupFormComponent],
      providers: [
        { provide: GroupPhaseService, useValue: groupPhaseService },
        { provide: GroupService, useValue: groupService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: groupPhaseId })
            }
          }
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
    })
      .compileComponents();
  }));

  describe("when user is not authorized", () => {
    beforeEach(() => {
      groupPhaseService.isAuthorizedReturnValue = false;
      fixture = TestBed.createComponent(GroupPhaseFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it('should show group phase name', () => {
      expect(html).toContain(groupPhase.name);
    });

    it("should show names of all groups in groupPhase inside designated area", () => {
      let groupsArea = fixture.debugElement.query(By.css("#group-phase-members-list"));
      expect(groupsArea.nativeElement.textContent).toContain(groups[0].name);
      expect(groupsArea.nativeElement.textContent).toContain(groups[1].name);
      expect(groupsArea.nativeElement.textContent).toContain(groups[2].name);
    });

    it("should call group phase service to get rest of group phase data", () => {
      expect(groupPhaseService.getValues).toEqual([groupPhaseId]);
    });

    it("should not show group deletion butons", () => {
      expect(fixture.debugElement.query(By.css("#delete-group")) === null).toBeTruthy();
    });

    it("should not show form for creating group phases", () => {
      expect(fixture.debugElement.query(By.css("#save-group")) === null).toBeTruthy();
    });
  });

  describe("when user is authorized", () => {
    beforeEach(() => {
      groupPhaseService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(GroupPhaseFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("should show group deletion butons", () => {
      expect(fixture.debugElement.query(By.css("#delete-group")) === null).toBeFalsy();
    });

    it("should show form for creating group phases", () => {
      expect(fixture.debugElement.query(By.css("#save-group")) === null).toBeFalsy();
    });

    it("reloads groups when reload is requested from group list", () => {
      let btn;
      groupService.getListValues = [];
      btn = fixture.debugElement.query(By.css("#delete-group"));
      btn.nativeElement.click();
      expect(groupService.getListValues).toEqual([groupPhaseId]);
    });

    it("reloads groups when reload is requested from group form", () => {
      let btn;
      groupService.getListValues = [];
      btn = fixture.debugElement.query(By.css("#save-group"));
      btn.nativeElement.click();
      expect(groupService.getListValues).toEqual([groupPhaseId]);
    });

    describe("when name is written and create button is pushed", () => {
      beforeEach(() => {
        fixture.detectChanges();
        const input = fixture.debugElement.query(By.css('[name="name"]'));
        input.nativeElement.value = "ABC";
        input.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        let btn = fixture.debugElement.query(By.css("#save-group"));
        btn.nativeElement.click();
        fixture.detectChanges();
      });

      it("should create a group with correct group phase id", waitForAsync(() => {
        fixture.whenStable().then(() => {
          expect(groupService.addValues[0].group_phase).toBe(groupPhaseId);
          expect(groupService.addValues[0].id).toBe(0);
        });
      }));
    });
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupFormComponent } from './group-form.component';
import { GroupService } from '../group.service';
import { GroupServiceSpy } from '../group.service.spy';
import { Group } from '../group';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

const groupId: number = 231;
const groupPhaseId: number = 98;
const group: Group = {
  name: "G1",
  group_phase: groupPhaseId,
  id: groupId
}

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;
  let groupService: GroupServiceSpy;
  let injectedGroup: Group;

  beforeEach(waitForAsync(() => {
    groupService = new GroupServiceSpy();
    TestBed.configureTestingModule({
      declarations: [GroupFormComponent],
      providers: [
        { provide: GroupService, useValue: groupService }
      ],
      imports: [FormsModule, RouterTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    //This form is both for creation
    // of new groups and for editing old
    injectedGroup = new Group();
    injectedGroup.id = groupId;
    injectedGroup.group_phase = groupPhaseId;
    injectedGroup.name = "G2";
    fixture.detectChanges();
  });

  describe("when name is written and create button is pushed", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.group = injectedGroup;
      component.group.name = group.name;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#save-group"));
      btn.nativeElement.click();

    });

    it("should create a group with given name and group phase id", () => {
      expect(groupService.addValues[0].name).toBe(group.name);
      expect(groupService.addValues[0].group_phase).toBe(group.group_phase);
      expect(groupService.addValues[0].id).toBe(group.id);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });
});

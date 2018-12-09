import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

  beforeEach(async(() => {
    groupService = new GroupServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ GroupFormComponent ],
      providers: [
        {provide: GroupService, useValue: groupService}
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
    injectedGroup.id=groupId;
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
      btn = fixture.debugElement.query(By.css("#save-group"));
      component.group = injectedGroup;
      component.group.name = group.name;
      btn.nativeElement.click();

    });

    it("should create a group with given name and group phase id", () => {
      expect(groupService.addValue.name).toBe(group.name);
      expect(groupService.addValue.group_phase).toBe(group.group_phase);
      expect(groupService.addValue.id).toBe(group.id);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

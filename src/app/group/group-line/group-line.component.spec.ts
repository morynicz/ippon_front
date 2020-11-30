import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupLineComponent } from './group-line.component';
import { Group } from '../group';
import { GroupServiceSpy } from '../group.service.spy';
import { GroupService } from '../group.service';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

const groupId: number = 231;
const groupPhaseId: number = 98;
const group: Group = {
  name: "G1",
  group_phase: groupPhaseId,
  id: groupId
}

describe('GroupLineComponent', () => {
  let component: GroupLineComponent;
  let fixture: ComponentFixture<GroupLineComponent>;
  let groupService: GroupServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    groupService = new GroupServiceSpy();
    TestBed.configureTestingModule({
      declarations: [GroupLineComponent],
      providers: [
        {
          provide: GroupService,
          useValue: groupService
        }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupLineComponent);
    component = fixture.componentInstance;
    component.group = group;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should display group name', () => {
    expect(html.textContent).toContain('G1');
  });

  it('should provide link to the team', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
      .toBe('/groups/' + group.id);
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-group')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(waitForAsync(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-group"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for group to group.service",
      () => {
        expect(groupService.deleteValue).toEqual(group);
      });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });
  });


});

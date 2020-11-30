import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupMemberLineComponent } from './group-member-line.component';
import { GroupMemberServiceSpy } from '../group-member.service.spy';
import { GroupMemberService } from '../group-member.service';
import { By } from '@angular/platform-browser';
import { Team } from '../../team/team';
import { GroupMember } from '../group-member';
import { RouterTestingModule } from '@angular/router/testing';

const tournamentId: number = 4;
const teamId: number = 32;
const groupId: number = 345;

const team: Team = {
  id: teamId,
  name: "T1",
  members: [],
  tournament: tournamentId
}

const member: GroupMember = {
  team: teamId,
  group: groupId
}

describe('GroupMemberLineComponent', () => {
  let component: GroupMemberLineComponent;
  let fixture: ComponentFixture<GroupMemberLineComponent>;
  let groupMemberService: GroupMemberServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    groupMemberService = new GroupMemberServiceSpy();
    TestBed.configureTestingModule({
      declarations: [GroupMemberLineComponent],
      providers: [
        { provide: GroupMemberService, useValue: groupMemberService }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberLineComponent);
    component = fixture.componentInstance;
    component.team = team;
    component.group = groupId;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should display team name', () => {
    expect(html.textContent).toContain('T1');
  });

  it('should provide link to the team', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
      .toBe('/teams/' + team.id);
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-group-member')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(waitForAsync(() => {
      reloadRequested = false;
      component.team = team;
      component.group = groupId;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css(`#delete-group-member-${team.id}`));
      btn.nativeElement.click();

    }));

    it("sends to delete request for member to GroupMember.service",
      () => {
        expect(groupMemberService.deleteValue).toEqual(member);
      });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });

  });
});

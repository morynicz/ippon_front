import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberFormComponent } from './group-member-form.component';
import { Team } from '../../team/team';
import { GroupMemberServiceSpy } from '../group-member.service.spy';
import { GroupMemberService } from '../group-member.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GroupMember } from '../group-member';

const tournamentId: number = 32;
const groupId: number = 231;
const teamFightId: number = 87;
const unassignedTeams: Team[] = [
  {
    id: 22,
    name: "T1",
    members: [],
    tournament: tournamentId
  },
  {
    id: 27,
    name: "T2",
    members: [],
    tournament: tournamentId
  },
  {
    id: 28,
    name: "T3",
    members: [],
    tournament: tournamentId
  }
]

const assignedTeams: Team[] = [
  {
    id: 25,
    name: "T4",
    members: [],
    tournament: tournamentId
  },
  {
    id: 23,
    name: "T5",
    members: [],
    tournament: tournamentId
  },
  {
    id: 21,
    name: "T6",
    members: [],
    tournament: tournamentId
  }
]


describe('GroupMemberFormComponent', () => {
  let component: GroupMemberFormComponent;
  let fixture: ComponentFixture<GroupMemberFormComponent>;
  let groupMemberService: GroupMemberServiceSpy;
  let html;

  beforeEach(async(() => {
    groupMemberService = new GroupMemberServiceSpy();
    groupMemberService.getListReturnValue.push(assignedTeams);
    groupMemberService.getNotAssignedReturnValue.push(unassignedTeams);
    TestBed.configureTestingModule({
      declarations: [GroupMemberFormComponent],
      providers: [
        { provide: GroupMemberService, useValue: groupMemberService },
      ],
      imports: [
        FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberFormComponent);
    component = fixture.componentInstance;
    component.group = groupId;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should load teams not assigned to any team', () => {
    expect(groupMemberService.getListValues).toEqual([groupId]);
  });

  it("should show names of unassigned teams", () => {
    let unasssignedArea = fixture.debugElement.query(
      By.css("#unassigned-teams")).nativeElement;
    expect(unasssignedArea.textContent).toContain(unassignedTeams[0].name);
    expect(unasssignedArea.textContent).toContain(unassignedTeams[1].name);
    expect(unasssignedArea.textContent).toContain(unassignedTeams[2].name);
  });

  it("should show names of assigned teams", () => {
    let asssignedArea = fixture.debugElement.query(
      By.css("#assigned-teams")).nativeElement;
    expect(asssignedArea.textContent).toContain(assignedTeams[0].name);
    expect(asssignedArea.textContent).toContain(assignedTeams[1].name);
    expect(asssignedArea.textContent).toContain(assignedTeams[2].name);
  });

  describe("when unassigned an add-team button is pressed", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css(`#add-member-${unassignedTeams[0].id}`));
      btn.nativeElement.click();
    }));

    it("sends request to create member with selected team", () => {
      let member: GroupMember = {
        'group': groupId,
        'team': unassignedTeams[0].id
      }
      expect(groupMemberService.addValue).toEqual(member);
    });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });
  });

  describe("when assigned an add-team button is pressed", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css(`#remove-member-${assignedTeams[0].id}`));
      btn.nativeElement.click();
    }));

    it("sends request to remove member with selected team", () => {
      let member: GroupMember = {
        'group': groupId,
        'team': assignedTeams[0].id
      }
      expect(groupMemberService.deleteValue).toEqual(member);
    });

    it("triggers reload request in parent component", () => {
      expect(reloadRequested).toBe(true);
    });

  });
});

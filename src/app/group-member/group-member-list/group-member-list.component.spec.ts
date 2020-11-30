import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GroupMemberListComponent } from './group-member-list.component';
import { Team } from '../../team/team';
import { GroupMemberLineComponent } from '../group-member-line/group-member-line.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { GroupMemberServiceSpy } from '../group-member.service.spy';
import { TeamService } from '../../team/team.service';
import { GroupMemberService } from '../group-member.service';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
  template: "<ippon-group-member-list [teams]='teams' [groupId]='groupId' [isAuthorized]='false' (reloadRequest)='reload()' ></ippon-group-member-list>"
})
class TestComponent implements OnInit {
  teams: Team[] = [];
  groupId: number = 231;
  reload(): void {

  }
  ngOnInit() {
    this.teams = [];
  }
}

describe('GroupMemberListComponent', () => {
  const tournamentId: number = 32;
  const groupId: number = 231;
  const teams: Team[] = [
    {
      id: 22,
      name: "TOne",
      members: [],
      tournament: tournamentId
    },
    {
      id: 27,
      name: "TTwo",
      members: [],
      tournament: tournamentId
    },
    {
      id: 28,
      name: "TThree",
      members: [],
      tournament: tournamentId
    }
  ]

  let teamService: TeamServiceSpy;
  let groupMemberService: GroupMemberServiceSpy;
  let reloadRequested: boolean = false;
  let html;

  beforeEach(waitForAsync(() => {
    groupMemberService = new GroupMemberServiceSpy();
    groupMemberService.getScoreReturnValues.set(teams[0].id, { wins: 1, draws: 2, points: 3, id: teams[0].id });
    groupMemberService.getScoreReturnValues.set(teams[1].id, { wins: 4, draws: 5, points: 6, id: teams[1].id });
    groupMemberService.getScoreReturnValues.set(teams[2].id, { wins: 7, draws: 8, points: 9, id: teams[2].id });

    TestBed.configureTestingModule({
      declarations: [
        GroupMemberListComponent,
        GroupMemberLineComponent,
        TestComponent
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: GroupMemberService, useValue: groupMemberService }
      ],
      imports: [
        RouterTestingModule,
      ]
    })
      .compileComponents();
  }));

  describe("when initial values are empty and then input changes", () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should reload content", waitForAsync(() => {
      component.teams = teams;
      fixture.detectChanges();
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;

      expect(html).toContain(1);
      expect(html).toContain(2);
      expect(html).toContain(3);
      expect(html).toContain(4);
      expect(html).toContain(5);
      expect(html).toContain(6);
      expect(html).toContain(7);
      expect(html).toContain(8);
      expect(html).toContain(9);
    }));
  });

  describe("when initial values are correct", () => {
    let component: GroupMemberListComponent;
    let fixture: ComponentFixture<GroupMemberListComponent>;
    beforeEach(() => {
      fixture = TestBed.createComponent(GroupMemberListComponent);
      component = fixture.componentInstance;
      component.groupId = groupId;
      component.reloadRequest.subscribe(() => {
        reloadRequested = true;
      });
      component.teams = teams;
    });

    // beforeEach(() => {
    //   component.teams = teams;
    // });
    describe("when user is not authorized", () => {
      beforeEach(() => {
        component.isAuthorized = false;
        fixture.detectChanges();
        html = fixture.debugElement.nativeElement.textContent;
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it("should show names of all teams in group inside designated area", waitForAsync(() => {
        fixture.whenStable().then(() => {
          expect(html).toContain(teams[0].name);
          expect(html).toContain(teams[1].name);
          expect(html).toContain(teams[2].name);
        });
      }));

      it("should show scores of all teams in group inside designated area", waitForAsync(() => {
        fixture.whenStable().then(() => {
          expect(html).toContain(1);
          expect(html).toContain(2);
          expect(html).toContain(3);
          expect(html).toContain(4);
          expect(html).toContain(5);
          expect(html).toContain(6);
          expect(html).toContain(7);
          expect(html).toContain(8);
          expect(html).toContain(9);
        });
      }));

      it("should not show fight deletion buttons", () => {
        expect(html).not.toContain("Delete");
      });
    });

    describe("when user is authorized", () => {
      beforeEach(() => {
        component.isAuthorized = true;
        fixture.detectChanges();
        html = fixture.debugElement.nativeElement.textContent;
      });

      it("should show fight deletion buttons", () => {
        expect(html).toContain("Delete");
      });

      it("should show names of all teams in group inside designated area", waitForAsync(() => {
        fixture.whenStable().then(() => {
          expect(html).toContain(teams[0].name);
          expect(html).toContain(teams[1].name);
          expect(html).toContain(teams[2].name);
        });
      }));

      it("should show scores of all teams in group inside designated area", waitForAsync(() => {
        fixture.whenStable().then(() => {
          expect(html).toContain(1);
          expect(html).toContain(2);
          expect(html).toContain(3);
          expect(html).toContain(4);
          expect(html).toContain(5);
          expect(html).toContain(6);
          expect(html).toContain(7);
          expect(html).toContain(8);
          expect(html).toContain(9);
        });
      }));
    });
  });
});

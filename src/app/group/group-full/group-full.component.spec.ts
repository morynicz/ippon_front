import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFullComponent } from './group-full.component';
import { GroupServiceSpy } from '../group.service.spy';
import { TeamFightServiceSpy } from '../../team-fight/team-fight.service.spy';
import { GroupService } from '../group.service';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { GroupFightService } from '../../group-fight/group-fight.service';
import { GroupFightServiceSpy } from '../../group-fight/group-fight.service.spy';
import { GroupFightFormComponent } from '../../group-fight/group-fight-form/group-fight-form.component';
import { GroupFightLineComponent } from '../../group-fight/group-fight-line/group-fight-line.component';
import { TeamFightLineComponent } from '../../team-fight/team-fight-line/team-fight-line.component';
import { TeamFightFormComponent } from '../../team-fight/team-fight-form/team-fight-form.component';
import { TeamLineComponent } from '../../team/team-line/team-line.component';
import { TeamService } from '../../team/team.service';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { Team } from '../../team/team';
import { TeamFight } from '../../team-fight/team-fight';
import { GroupFight } from '../../group-fight/group-fight';
import { By } from '@angular/platform-browser';
import { GroupMemberServiceSpy } from '../../group-member/group-member.service.spy';
import { GroupMemberService } from '../../group-member/group-member.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { GroupMemberLineComponent } from '../../group-member/group-member-line/group-member-line.component';
import { Group } from '../group';
import { GroupMemberFormComponent } from '../../group-member/group-member-form/group-member-form.component';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';
import { GroupMemberListComponent } from '../../group-member/group-member-list/group-member-list.component';
import { FightStatusPipe } from '../../fight-status.pipe';

describe('GroupFullComponent', () => {
  const tournamentId: number = 32;
  const teamFightId: number = 87;
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

  const teamFight: TeamFight = {
    aka_team: teams[0].id,
    shiro_team: teams[2].id,
    id: teamFightId,
    tournament: tournamentId,
    shiro_score: 0,
    aka_score: 0,
    status: FightStatus.Prepared,
    winner: FightWinner.None
  }

  const groupFightId: number = 768;
  const groupId: number = 231;
  const groupPhaseId: number = 98;

  const groupFight: GroupFight = {
    id: groupFightId,
    group: groupId,
    team_fight: teamFightId
  }

  const group: Group = {
    name: "G1",
    group_phase: groupPhaseId,
    id: groupId
  }

  let component: GroupFullComponent;
  let fixture: ComponentFixture<GroupFullComponent>;
  let groupService: GroupServiceSpy;
  let groupFightService: GroupFightServiceSpy;
  let teamFightService: TeamFightServiceSpy;
  let teamService: TeamServiceSpy;
  let groupMemberService: GroupMemberServiceSpy;
  let html: any;

  beforeEach(async(() => {
    groupService = new GroupServiceSpy();
    groupService.getReturnValues.push(group);
    teamFightService = new TeamFightServiceSpy();
    teamFightService.getReturnValues.push(teamFight);
    teamFightService.addReturnValues.push(teamFight);
    groupFightService = new GroupFightServiceSpy();
    groupFightService.getListReturnValues.push([groupFight]);
    teamService = new TeamServiceSpy();
    teamService.getReturnValues.push(teams[0]);
    teamService.getReturnValues.push(teams[2]);
    groupMemberService = new GroupMemberServiceSpy();
    groupMemberService.getListReturnValue.push(teams);
    groupMemberService.getListReturnValue.push(teams);
    groupMemberService.getListReturnValue.push(teams);
    groupMemberService.getScoreReturnValues.set(teams[0].id, { wins: 1, draws: 2, points: 3, id: teams[0].id });
    groupMemberService.getScoreReturnValues.set(teams[1].id, { wins: 4, draws: 5, points: 6, id: teams[1].id });
    groupMemberService.getScoreReturnValues.set(teams[2].id, { wins: 7, draws: 8, points: 9, id: teams[2].id });

    TestBed.configureTestingModule({
      declarations: [
        GroupFullComponent,
        GroupFightFormComponent,
        GroupFightLineComponent,
        TeamFightLineComponent,
        TeamFightFormComponent,
        TeamLineComponent,
        GroupMemberLineComponent,
        GroupMemberFormComponent,
        GroupMemberListComponent,
        FightStatusPipe
      ],
      providers: [
        { provide: GroupService, useValue: groupService },
        { provide: GroupFightService, useValue: groupFightService },
        { provide: TeamFightService, useValue: teamFightService },
        { provide: TeamService, useValue: teamService },
        { provide: GroupMemberService, useValue: groupMemberService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: groupId })
            }
          }
        }
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    })
      .compileComponents();
  }));

  describe("when user is not authorized", () => {
    beforeEach(() => {
      groupService.isAuthorizedReturnValue = false;
      fixture = TestBed.createComponent(GroupFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it('should show group name', () => {
      expect(html).toContain(group.name);
    });

    it("should show names of all teams in group inside designated area", () => {
      let teamsArea = fixture.debugElement.query(By.css("#group-members-list"));
      expect(teamsArea.nativeElement.textContent).toContain(teams[0].name);
      expect(teamsArea.nativeElement.textContent).toContain(teams[1].name);
      expect(teamsArea.nativeElement.textContent).toContain(teams[2].name);
    });

    it("should show scores of all teams in group inside designated area", async(() => {
      let teamsArea = fixture.debugElement.query(By.css("#group-members-list"));
      fixture.whenStable().then(() => {
        expect(teamsArea.nativeElement.textContent).toContain(1);
        expect(teamsArea.nativeElement.textContent).toContain(2);
        expect(teamsArea.nativeElement.textContent).toContain(3);
        expect(teamsArea.nativeElement.textContent).toContain(4);
        expect(teamsArea.nativeElement.textContent).toContain(5);
        expect(teamsArea.nativeElement.textContent).toContain(6);
        expect(teamsArea.nativeElement.textContent).toContain(7);
        expect(teamsArea.nativeElement.textContent).toContain(8);
        expect(teamsArea.nativeElement.textContent).toContain(9);
      });
    }));


    it("should call group service to get rest of group data", () => {
      expect(groupService.getValues).toEqual([groupId]);
    });

    it("should show all the group fights of this group", () => {
      let groupFightsArea = fixture.debugElement.query(By.css("#group-fights"));
      expect(groupFightsArea.nativeElement.textContent).toContain(teams[0].name);
      expect(groupFightsArea.nativeElement.textContent).toContain(teams[2].name);
      expect(groupFightsArea.nativeElement.textContent).not.toContain(teams[1].name);
    });

    it("should not show member management area", () => {
      expect(fixture.debugElement.query(By.css("#group-member-management"))).toBeNull();
    });

    it("should not show form for creating group fights", () => {
      expect(fixture.debugElement.query(By.css("#group-fight-management")) == null).toBeTruthy();
    });

    it("should get the tournament id", () => {
      expect(component.tournament).toEqual(tournamentId);
    });
  });

  describe("when user is authorized", () => {
    beforeEach(() => {
      groupService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(GroupFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement.textContent;
    });

    it("should not show member list area", () => {
      expect(fixture.debugElement.query(By.css("#group-member-list")) == null).toBeTruthy();
    });

    it("should show member management area", () => {
      expect(fixture.debugElement.query(By.css("#group-member-management")) == null).toBeFalsy();
    });

    it("should show form for creating group fights", () => {
      expect(fixture.debugElement.query(By.css("#group-fight-management")) == null).toBeFalsy();
    });

    it("reloads teams when team reload is requested", () => {
      let btn;
      groupMemberService.getListValues = [];
      btn = fixture.debugElement.query(By.css(`#delete-group-member-${teams[0].id}`));
      btn.nativeElement.click();
      expect(groupMemberService.getListValues).toEqual([groupId, groupId]);
    });

    it("reloads fights when fights reload is requested", (done) => {
      fixture.whenStable().then(() => {
        let btn;
        groupFightService.getListValues = [];
        btn = fixture.debugElement.query(By.css("#save-team-fight"));
        let redSelect = fixture.debugElement.query(By.css('#aka-team-select')).nativeElement;
        redSelect.click();
        redSelect.value = redSelect.options[0].value;
        redSelect.dispatchEvent(new Event('change'));
        let whiteSelect = fixture.debugElement.query(By.css('#shiro-team-select')).nativeElement;
        whiteSelect.value = whiteSelect.options[2].value;
        whiteSelect.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        btn.nativeElement.click();
        fixture.detectChanges();

        expect(groupFightService.getListValues).toEqual([groupId]);
        done();
      });
    });

  });
});

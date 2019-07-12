import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFullComponent } from './team-full.component';
import { Player } from '../../player/player';
import { TeamService } from '../team.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TeamServiceSpy } from '../team.service.spy';
import { Team } from '../team';
import { TeamMemberServiceSpy } from '../team-member.service.spy';
import { TeamMemberService } from '../team-member.service';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

const teamId: number = 86;
const tournamentId: number = 342;

const members: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 1
},
{
  name: 'P3',
  surname: 'S3',
  id: 3
},
{
  name: 'P5',
  surname: 'S5',
  id: 5
}];

const unassigned: Player[] = [
  {
    name: 'P2',
    surname: 'S2',
    id: 2
  }
];

const team: Team = {
  id: teamId,
  name: "T1",
  members: [members[0].id, members[1].id],
  tournament: tournamentId
}

describe('TeamFullComponent', () => {
  let component: TeamFullComponent;
  let fixture: ComponentFixture<TeamFullComponent>;
  let teamService: TeamServiceSpy;
  let teamMemberService: TeamMemberServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpy();
    teamService.getReturnValues.push(team);
    teamMemberService = new TeamMemberServiceSpy();
    teamMemberService.getListReturnValue.push(members);
    teamMemberService.getNotAssignedReturnValue.push(unassigned);
    TestBed.configureTestingModule({
      declarations: [
        TeamFullComponent,
        PlayerLineComponent
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamMemberService, useValue: teamMemberService },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: teamId })
            }
          }
        }],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));
  describe("when user is not authorized", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TeamFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should show team name", () => {
      expect(html.textContent).toContain(team.name);
    });

    it("should show names of members", () => {
      expect(html.textContent).toContain(members[0].name);
      expect(html.textContent).toContain(members[1].name);
      expect(html.textContent).toContain(members[2].name);
    });

  });

  describe("when user is authorized", () => {
    beforeEach(() => {
      teamService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(TeamFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });
    it("should show names of unassigned players", () => {
      expect(html.textContent).toContain(unassigned[0].name);
    });
    describe("when remove member button is pressed", () => {
      let btn;
      let reloadRequested: boolean;

      beforeEach(async(() => {
        teamMemberService.getListReturnValue.push([members[1], members[2]]);
        teamMemberService.getNotAssignedReturnValue.push([unassigned[0], members[0]]);
        fixture.detectChanges();
        btn = fixture.debugElement.query(By.css(`#remove-member-${members[0].id}`));
        btn.nativeElement.click();
      }));

      it("sends delete request for the member", () => {
        expect(teamMemberService.deleteValue.team).toEqual(teamId);
        expect(teamMemberService.deleteValue.player).toEqual(members[0].id);
      });

      it("reloads members and unassigned players", () => {
        expect(teamMemberService.getListValues).toEqual([teamId, teamId]);
        expect(teamMemberService.getNotAssignedValues).toEqual([teamId, teamId]);
      });

    });

    describe("when add member button is pressed", () => {
      let btn;

      beforeEach(async(() => {
        teamMemberService.getListReturnValue.push([members[0], members[1], members[2], unassigned[0]]);
        teamMemberService.getNotAssignedReturnValue.push([]);
        fixture.detectChanges();
        btn = fixture.debugElement.query(By.css(`#add-member-${unassigned[0].id}`));
        btn.nativeElement.click();
      }));

      it("sends add request for the member", () => {
        expect(teamMemberService.addValues[0].team).toEqual(teamId);
        expect(teamMemberService.addValues[0].player).toEqual(unassigned[0].id);
      });

      it("reloads members and unassigned players", () => {
        expect(teamMemberService.getListValues).toEqual([teamId, teamId]);
        expect(teamMemberService.getNotAssignedValues).toEqual([teamId, teamId]);
      });

    });

  });

});

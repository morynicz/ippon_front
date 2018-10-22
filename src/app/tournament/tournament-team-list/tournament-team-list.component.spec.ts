import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTeamListComponent } from './tournament-team-list.component';
import { TeamLineComponent } from '../../team/team-line/team-line.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TeamFormComponent } from '../../team/team-form/team-form.component';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../authorization/authentication.service';
import { AuthorizationService } from '../../authorization/authorization.service';

const tournamentId: number = 4;
const teams: Team[] = [
  {
    id: 0,
    name: "T0",
    members: [],
    tournament: tournamentId
  }, {
    id: 1,
    name: "T1",
    members: [],
    tournament: tournamentId
  }, {
    id: 2,
    name: "T2",
    members: [],
    tournament: tournamentId
  }
]

class AuthorizationServiceSpy {
  isTournamentStaffReturnValue: boolean = false;
  isTournamentStaffValue: number = -1;
  isTournamentStaff(tournamentId: number): Observable<boolean> {
    this.isTournamentStaffValue = tournamentId;
    return of(this.isTournamentStaffReturnValue);
  }
}

describe('TournamentTeamListComponent', () => {
  let component: TournamentTeamListComponent;
  let fixture: ComponentFixture<TournamentTeamListComponent>;
  let teamService: TeamServiceSpy;
  let authorizationService: AuthorizationServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpy();
    teamService.getListReturnValues.push(teams);
    teamService.isAuthorizedReturnValue = false;
    authorizationService = new AuthorizationServiceSpy();
    authorizationService.isTournamentStaffReturnValue = false;
    TestBed.configureTestingModule({
      declarations: [
        TournamentTeamListComponent,
        TeamLineComponent,
        TeamFormComponent
      ],
      providers: [
        {
          provide: TeamService,
          useValue: teamService
        },
        {
          provide: AuthorizationService,
          useValue: authorizationService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: tournamentId })
            }
          }
        }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  describe("when user is not authorized", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TournamentTeamListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('shows names of teams of this tournament', () => {
      expect(html.textContent).toContain(teams[0].name);
      expect(html.textContent).toContain(teams[1].name);
      expect(html.textContent).toContain(teams[2].name);
    });

    it("should retrieve teams from teams api with tournament id", () => {
      expect(teamService.getListValue).toEqual([tournamentId]);
    });

    it("should not show form for adding new teams", () => {
      expect(html.querySelector('#add-team-form')).toBeFalsy();
    });
  });

  describe("when user is authorized", () => {
    beforeEach(() => {
      authorizationService.isTournamentStaffReturnValue = true;
      teamService.isAuthorizedReturnValue = false;
      fixture = TestBed.createComponent(TournamentTeamListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should show form for adding new teams", () => {
      expect(html.querySelector('#add-team-form')).toBeTruthy();
    });

    describe("when reloadTeams() method is called", () => {
      beforeEach(() => {
        component.reload();
      });
      it("loads teams again", () => {
        expect(teamService.getListValue.length).toBe(2);
        expect(teamService.getListValue[1]).toBe(tournamentId);
      });
    });
  });

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLineComponent } from './team-line.component';
import { Team } from '../team';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TeamServiceSpy } from '../team.service.spy';
import { TeamService } from '../team.service';

const tournamentId: number = 4;
const teamId: number = 32;

const team: Team = {
  id: teamId,
  name: "T1",
  members: [],
  tournament: tournamentId
}

describe('TeamLineComponent', () => {
  let component: TeamLineComponent;
  let fixture: ComponentFixture<TeamLineComponent>;
  let teamService: TeamServiceSpy;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpy();
    TestBed.configureTestingModule({
      declarations: [TeamLineComponent],
      providers: [
        {
          provide: TeamService,
          useValue: teamService
        }],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLineComponent);
    component = fixture.componentInstance;
    component.team = team;
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
    expect(html.querySelector('#delete-team')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.team = team;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-team"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for point to team.service",
      () => {
        fixture.whenStable().then(() => {
          expect(teamService.deleteValue).toEqual(team);
        });
      });

    it("triggers reload request in parent component", () => {
      fixture.whenStable().then(() => {
        expect(reloadRequested).toBe(true);
      });
    });

  });

});

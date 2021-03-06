import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TeamFormComponent } from './team-form.component';
import { TeamServiceSpy } from '../team.service.spy';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamService } from '../team.service';
import { By } from '@angular/platform-browser';
import { Team } from '../team';

const tournamentId: number = 4;

const team: Team = {
  id: 0,
  name: "T1",
  members: [],
  tournament: tournamentId
}

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;
  let teamService: TeamServiceSpy;
  let reloadRequested: boolean;

  beforeEach(waitForAsync(() => {
    teamService = new TeamServiceSpy();
    reloadRequested = false;
    TestBed.configureTestingModule({
      declarations: [TeamFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: TeamService, useValue: teamService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    component.tournamentId = tournamentId;
    component.reloadRequest.subscribe(req => {
      reloadRequested = true;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("when name is written and create button is pushed", () => {
    let btn;

    beforeEach(() => {
      btn = fixture.debugElement.query(By.css("#save-team"));
      component.team.name = team.name;
      btn.nativeElement.click();
      fixture.detectChanges();
    });

    it("should create a team with given name and tournament id", () => {
      expect(teamService.addValues[0].name).toBe(team.name);
      expect(teamService.addValues[0].tournament).toBe(team.tournament);
      expect(teamService.addValues[0].id).toBe(team.id);
    });

    it("should call reload callback", () => {
      expect(reloadRequested).toBeTruthy();
    });
  });
});

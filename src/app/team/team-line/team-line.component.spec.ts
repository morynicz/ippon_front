import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLineComponent } from './team-line.component';
import { Team } from '../team';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

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
  let html;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamLineComponent],
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
      .toBe('/team/' + team.id);
  });

});

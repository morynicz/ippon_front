import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFightFormComponent } from './group-fight-form.component';
import { GroupFightServiceSpy } from '../group-fight.service.spy';
import { Team } from '../../team/team';
import { TeamFight } from '../../team-fight/team-fight';
import { TeamFightServiceSpy } from '../../team-fight/team-fight.service.spy';
import { TeamFightFormComponent } from '../../team-fight/team-fight-form/team-fight-form.component';
import { TeamLineComponent } from '../../team/team-line/team-line.component';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { TeamService } from '../../team/team.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GroupFightService } from '../group-fight.service';
import { By } from '@angular/platform-browser';
import { TeamServiceSpy } from '../../team/team.service.spy';


describe('GroupFightFormComponent', () => {
  const tournamentId: number = 32;
  const groupId: number = 87;

  const teams: Team[] = [
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
      id: 27,
      name: "T2",
      members: [],
      tournament: tournamentId
    }
  ]

  const teamFightId: number = 345;

  const teamFight: TeamFight = {
    aka_team: teams[0].id,
    shiro_team: teams[2].id,
    id: teamFightId,
    tournament: tournamentId
  }

  let component: GroupFightFormComponent;
  let fixture: ComponentFixture<GroupFightFormComponent>;
  let groupFightService: GroupFightServiceSpy;
  let teamFightService: TeamFightServiceSpy;
  let teamService: TeamServiceSpy;
  let reloadRequested: boolean;
  let html;

  beforeEach(async(() => {
    teamFightService = new TeamFightServiceSpy();
    teamFightService.addReturnValue = teamFight;
    groupFightService = new GroupFightServiceSpy();
    teamService = new TeamServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        GroupFightFormComponent,
        TeamFightFormComponent,
        TeamLineComponent
      ],
      providers: [
        { provide: GroupFightService, useValue: groupFightService },
        { provide: TeamFightService, useValue: teamFightService },
        { provide: TeamService, useClass: TeamFightServiceSpy }
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFightFormComponent);
    component = fixture.componentInstance;
    component.teams = teams;
    component.tournament = tournamentId;
    component.group = groupId;
    component.reloadRequest.subscribe(req => {
      reloadRequested = true;
    });
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;
  });

  it("should provide possibility to select any team from input", () => {
    expect(html).toContain(teams[0].name);
    expect(html).toContain(teams[1].name);
    expect(html).toContain(teams[2].name);
  });

  describe("when valid teams are selected and create button is pushed", () => {
    let btn;

    beforeEach(() => {
      fixture.whenStable().then(() => {
        btn = fixture.debugElement.query(By.css("#save-team-fight"));
        let redSelect = fixture.debugElement.query(By.css('#aka-team-select')).nativeElement;
        redSelect.click();
        redSelect.value = redSelect.options[0].value;
        redSelect.dispatchEvent(new Event('change'));
        let whiteSelect = fixture.debugElement.query(By.css('#shiro-team-select')).nativeElement;
        whiteSelect.value = redSelect.options[2].value;
        whiteSelect.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        btn.nativeElement.click();
        fixture.detectChanges();
      });
    });

    it("should create teamFight between selected teams", (done) => {
      fixture.whenStable().then(() => {
        expect(teamFightService.addValue.aka_team).toEqual(teams[0].id);
        expect(teamFightService.addValue.shiro_team).toEqual(teams[2].id);
        expect(teamFightService.addValue.tournament).toEqual(tournamentId);
        done();
      });
    });

    it("should create groupFight from created TeamFight", (done) => {
      fixture.whenStable().then(() => {
        expect(groupFightService.addValue.team_fight).toEqual(teamFightId);
        expect(groupFightService.addValue.group).toEqual(groupId);
        done();
      });
    });

    it("should request reload from parent component", (done) => {
      fixture.whenStable().then(() => {
        expect(reloadRequested).toBe(true);
        done();
      });
    });
  });
});
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupPlanningComponent } from './cup-planning.component';
import { PlannedPosition } from '../planned-position';
import { CupPhaseServiceSpy } from '../cup-phase.service.spy';
import { CupPhaseService } from '../cup-phase.service';
import { Team } from '../../team/team';
import { TeamService } from '../../team/team.service';
import { TeamServiceSpy } from '../../team/team.service.spy';

describe('CupPlanningComponent', () => {
  let cupPhaseId: number = 24;
  let plannedPositions: PlannedPosition[] = [
    {
      id: 324,
      label: "PosA",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 325,
      label: "PosB",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 326,
      label: "PosC",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 327,
      label: "PosD",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 328,
      label: "PosE",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 329,
      label: "PosF",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 340,
      label: "PosG",
      cup_phase: cupPhaseId,
      team: 0
    },
    {
      id: 341,
      label: "PosH",
      cup_phase: cupPhaseId,
      team: 0
    }
  ];
  let component: CupPlanningComponent;
  let fixture: ComponentFixture<CupPlanningComponent>;
  let cupPhaseService: CupPhaseServiceSpy;
  let teamService: TeamServiceSpy;
  let html;

  beforeEach(async(() => {
    cupPhaseService = new CupPhaseServiceSpy();
    teamService = new TeamServiceSpy();
    TestBed.configureTestingModule({
      declarations: [CupPlanningComponent],
      providers: [
        { provide: CupPhaseService, useValue: cupPhaseService },
        { provide: TeamService, useValue: teamService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    cupPhaseService.getPlannedPositionsReturnValues.push(plannedPositions);
    fixture = TestBed.createComponent(CupPlanningComponent);
    component = fixture.componentInstance;
    component.cupPhaseId = cupPhaseId;
  });

  it("shows planned position names", () => {
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;
    expect(html).toContain("PosA")
    expect(html).toContain("PosB")
    expect(html).toContain("PosC")
    expect(html).toContain("PosD")
    expect(html).toContain("PosE")
    expect(html).toContain("PosF")
    expect(html).toContain("PosG")
    expect(html).toContain("PosH")
  });

  it("shows team name if it was planned instead of label", () => {
    let teamId = 48;
    plannedPositions[4].team = teamId;
    let team: Team = {
      id: teamId,
      members: [],
      name: "Zorgs",
      tournament: 12
    }
    teamService.getReturnValues.push(team);
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement.textContent;


    expect(html).toContain("PosA")
    expect(html).toContain("PosB")
    expect(html).toContain("PosC")
    expect(html).toContain("PosD")
    expect(html).toContain("Zorgs")
    expect(html).toContain("PosF")
    expect(html).toContain("PosG")
    expect(html).toContain("PosH")

  });
});

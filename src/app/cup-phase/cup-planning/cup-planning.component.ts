import { Component, OnInit, Input } from '@angular/core';
import { CupPhaseService } from '../cup-phase.service';
import { PlannedPosition } from '../planned-position';
import { map, mergeMap, mergeAll } from 'rxjs/operators';
import { Team } from '../../team/team';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'ippon-cup-planning',
  templateUrl: './cup-planning.component.html',
  styleUrls: ['./cup-planning.component.css']
})
export class CupPlanningComponent implements OnInit {
  @Input() cupPhaseId: number;
  plannedPositions: PlannedPosition[];
  teams: Map<number, Team> = new Map<number, Team>();
  constructor(private cupPhaseService: CupPhaseService, private teamService: TeamService) { }

  ngOnInit() {
    this.cupPhaseService.getPlannedPositions(this.cupPhaseId).pipe(
      map((resp: PlannedPosition[]) => {
        this.plannedPositions = resp;
        return this.plannedPositions.filter((pos: PlannedPosition) => pos.team != 0).map((pos: PlannedPosition) => this.teamService.get(pos.team))
      }),
      mergeAll
    ).subscribe((teams: Team[]) => teams.forEach((team: Team) => this.teams.set(team.id, team)));
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamFight } from '../team-fight';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { TeamFightService } from '../team-fight.service';

@Component({
  selector: 'ippon-team-fight-line',
  templateUrl: './team-fight-line.component.html',
  styleUrls: ['./team-fight-line.component.css']
})
export class TeamFightLineComponent implements OnInit {
  @Input() teamFight: TeamFight;
  @Input() isAuthorized: boolean = false;
  @Output() reloadRequest = new EventEmitter<any>();
  akaTeam: Team;
  shiroTeam: Team;
  constructor(
    private teamService: TeamService,
    private teamFightService: TeamFightService) { }

  ngOnInit() {
    if (this.teamFight != null) {
      this.teamService.get(this.teamFight.aka_team)
        .subscribe(response => this.akaTeam = response);
      this.teamService.get(this.teamFight.shiro_team)
        .subscribe(response => this.shiroTeam = response);
    }
  }

  private deleteTeamFight(): void {
    this.teamFightService.delete(this.teamFight)
      .subscribe(result => this.reloadRequest.emit(''));
  }
}

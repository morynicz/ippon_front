import { Component, OnInit, Input } from '@angular/core';
import { CupFight } from '../cup-fight';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { TeamService } from '../../team/team.service';
import { TeamFight } from '../../team-fight/team-fight';
import { Team } from '../../team/team';

@Component({
  selector: 'ippon-cup-fight-tile',
  templateUrl: './cup-fight-tile.component.html',
  styleUrls: ['./cup-fight-tile.component.css']
})
export class CupFightTileComponent implements OnInit {
  @Input() cupFight: CupFight;
  teamFight: TeamFight;
  aka_team: Team;
  shiro_team: Team;
  constructor(private teamFightService: TeamFightService,
    private teamService: TeamService) { }

  ngOnInit() {
    if (this.cupFight.team_fight) {
      this.teamFightService.get(this.cupFight.team_fight).subscribe((resp: TeamFight) => {
        this.teamFight = resp;
        this.teamService.get(this.teamFight.aka_team).subscribe(resp => this.aka_team = resp);
        this.teamService.get(this.teamFight.shiro_team).subscribe(resp => this.shiro_team = resp);
      });
    }
  }

}

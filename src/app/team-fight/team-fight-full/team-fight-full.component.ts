import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../team-fight.service';
import { TeamFight } from '../team-fight';
import { Team } from '../../team/team';
import { FightService } from '../../fight/fight.service';
import { Fight } from '../../fight/fight';
import { TeamMemberService } from '../../team/team-member.service';
import { Player } from '../../player/player';

@Component({
  selector: 'ippon-team-fight-full',
  templateUrl: './team-fight-full.component.html',
  styleUrls: ['./team-fight-full.component.css']
})
export class TeamFightFullComponent implements OnInit {
  teamFight: TeamFight;
  akaTeam: Team;
  shiroTeam: Team;
  fights: Fight[];
  isAdmin: boolean;

  akaTeamMembers: Player[];
  shiroTeamMembers: Player[];

  constructor(private route: ActivatedRoute,
    private teamService: TeamService,
    private teamfightService: TeamFightService,
    private fightService: FightService,
    private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.isAdmin = false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamfightService.get(id).subscribe(response => {
      this.teamFight = response;
      this.teamService.get(this.teamFight.aka_team).subscribe(response => this.akaTeam = response);
      this.teamService.get(this.teamFight.shiro_team).subscribe(response => this.shiroTeam = response);
      this.teamMemberService.getList(this.teamFight.aka_team).subscribe(response => this.akaTeamMembers = response);
      this.teamMemberService.getList(this.teamFight.shiro_team).subscribe(response => this.shiroTeamMembers = response);
      this.loadFights();
    });
    this.teamfightService.isAuthorized(id).subscribe(response => this.isAdmin = response);
  }

  private loadFights() {
    this.fightService.getList(this.teamFight.id).subscribe(response => this.fights = response);
  }

  reload(): void {
    this.loadFights();
  }

}

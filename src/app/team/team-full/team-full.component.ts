import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { TeamMemberService } from '../team-member.service';
import { Team } from '../team';
import { Player } from '../../player/player';

@Component({
  selector: 'ippon-team-full',
  templateUrl: './team-full.component.html',
  styleUrls: ['./team-full.component.css']
})
export class TeamFullComponent implements OnInit {
  team: Team;
  members: Player[];
  notAssigned: Player[];
  isAuthorized: boolean;
  constructor(private route: ActivatedRoute,
    private teamService: TeamService,
    private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.isAuthorized = false;
    const id = +this.route.snapshot.paramMap.get('id');
    this.teamService.get(id).subscribe(response => {
      this.team = response;
      this.teamService.isAuthorized(id)
        .subscribe(response => this.isAuthorized = response);
      this.loadPlayers(id);
    });

  }

  private loadPlayers(id: number) {
    this.teamMemberService.getList(id)
      .subscribe(response => this.members = response);
    this.teamMemberService.getNotAssigned(id)
      .subscribe(response => this.notAssigned = response);
  }

  removeMember(member: Player): void {
    this.teamMemberService.delete(
      { team: this.team.id, player: member.id })
      .subscribe(response => this.loadPlayers(this.team.id));
  }

  addMember(member: Player): void {
    this.teamMemberService.add(
      { team: this.team.id, player: member.id })
      .subscribe(response => this.loadPlayers(this.team.id));
  }
}

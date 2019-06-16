import { Component, OnInit } from '@angular/core';
import { GroupMemberService, MemberScore } from '../../group-member/group-member.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../team/team';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { GroupFight } from '../../group-fight/group-fight';
import { GroupFightService } from '../../group-fight/group-fight.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ippon-group-full',
  templateUrl: './group-full.component.html',
  styleUrls: ['./group-full.component.css']
})
export class GroupFullComponent implements OnInit {
  teams: Team[];
  group: Group;
  groupFights: GroupFight[];
  isAuthorized: boolean = false;
  tournament: number;
  teamScores: Map<number, MemberScore> = new Map<number, MemberScore>();
  constructor(private route: ActivatedRoute,
    private groupMemberService: GroupMemberService,
    private groupService: GroupService,
    private groupFightService: GroupFightService,
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loadTeams(id);
    this.groupService.get(id).subscribe(
      resp => this.group = resp
    );
    this.loadFights(id);
    this.groupService.isAuthorized(id).subscribe(
      response => this.isAuthorized = response
    )
  }

  private loadFights(id: number) {
    this.groupFightService.getList(id).subscribe(resp => {
      this.groupFights = resp;
    });
  }

  private loadTeams(id: number) {
    this.groupMemberService.getList(id).subscribe(
      resp => {
        this.teams = resp;
        if (this.teams.length > 0) {
          this.tournament = this.teams[0].tournament;
        }
        this.teams.forEach(team => {
          this.groupMemberService.getScore({ group: id, team: team.id }).subscribe(
            (resp: MemberScore) => this.teamScores.set(team.id, resp)
          );
        });
      });
  }

  ngOnInit() {
  }

  reloadTeams(): void {
    this.loadTeams(this.group.id);
  }
  reloadFights(): void {
    this.loadFights(this.group.id);
  }
}

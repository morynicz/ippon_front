import { Component, OnInit } from '@angular/core';
import { GroupMemberService } from '../group-member.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../team/team';
import { GroupService } from '../group.service';
import { Group } from '../group';
import { GroupFight } from '../../group-fight/group-fight';
import { GroupFightService } from '../../group-fight/group-fight.service';

@Component({
  selector: 'ippon-group-full',
  templateUrl: './group-full.component.html',
  styleUrls: ['./group-full.component.css']
})
export class GroupFullComponent implements OnInit {
  teams: Team[];
  group: Group;
  groupFights: GroupFight[];
  constructor(private route: ActivatedRoute,
    private groupMemberService: GroupMemberService,
    private groupService: GroupService,
    private groupFightService: GroupFightService,
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupMemberService.getList(id).subscribe(
      resp => this.teams = resp
    );
    this.groupService.get(id).subscribe(
      resp => this.group = resp
    );
    this.groupFightService.getList(id).subscribe(
      resp => {
        this.groupFights = resp;
      }
    );
  }

  ngOnInit() {
  }

  reloadTeams(): void {

  }
  reloadFights(): void {

  }
}

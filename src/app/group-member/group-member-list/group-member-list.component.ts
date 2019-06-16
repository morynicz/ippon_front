import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Team } from '../../team/team';
import { GroupMemberService, MemberScore } from '../group-member.service';


@Component({
  selector: 'ippon-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.css']
})
export class GroupMemberListComponent implements OnInit, OnChanges {
  @Input() teams: Team[];
  @Input() groupId: number;
  @Input() isAuthorized: boolean = false;
  @Output() reloadRequest: EventEmitter<any> = new EventEmitter<any>();
  teamScores: Map<number, MemberScore> = new Map<number, MemberScore>();

  constructor(private groupMemberService: GroupMemberService) { }

  ngOnInit() {
    this.loadTeamScores();
  }

  ngOnChanges() {
    this.loadTeamScores();
  }
  private loadTeamScores() {
    this.teams.forEach(team => {
      this.groupMemberService.getScore({ group: this.groupId, team: team.id }).subscribe((resp: MemberScore) => this.teamScores.set(team.id, resp));
    });
  }

  reload(): void {
    this.reloadRequest.emit("");
  }

}

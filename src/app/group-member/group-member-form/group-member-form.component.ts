import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupMemberService } from '../group-member.service';
import { Team } from '../../team/team';
import { GroupMember } from '../group-member';

@Component({
  selector: 'ippon-group-member-form',
  templateUrl: './group-member-form.component.html',
  styleUrls: ['./group-member-form.component.css']
})
export class GroupMemberFormComponent implements OnInit {
  @Input() group: number;
  @Output() reloadRequest = new EventEmitter<any>();
  unassignedTeams: Team[];
  assignedTeams: Team[];
  constructor(private groupMemberService: GroupMemberService) { }

  ngOnInit() {
    this.groupMemberService.getList(this.group).subscribe(
      response => this.assignedTeams = response
    );
    this.groupMemberService.getNotAssigned(this.group).subscribe(
      response => this.unassignedTeams = response
    )
  }

  private addMember(team: Team): void {
    let member: GroupMember = {
      "group": this.group,
      "team": team.id
    }
    this.groupMemberService.add(member)
      .subscribe(result => this.reloadRequest.emit(''));
  }

  private removeMember(team: Team): void {
    let member: GroupMember = {
      "group": this.group,
      "team": team.id
    }
    this.groupMemberService.delete(member)
      .subscribe(result => this.reloadRequest.emit(''));
  }
}

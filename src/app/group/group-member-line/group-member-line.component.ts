import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupMemberService } from '../group-member.service';
import { Team } from '../../team/team';
import { GroupMember } from '../group-member';

@Component({
  selector: 'ippon-group-member-line',
  templateUrl: './group-member-line.component.html',
  styleUrls: ['./group-member-line.component.css']
})
export class GroupMemberLineComponent implements OnInit {

  @Input() team: Team;
  @Input() group: number;
  @Input() isAuthorized: boolean;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private groupMemberService: GroupMemberService) { }

  ngOnInit() {
  }

  deleteGroupMember(): void {
    let groupMember: GroupMember = {
      'group': this.group,
      'team': this.team.id
    }
    this.groupMemberService.delete(groupMember)
      .subscribe(resp => this.reloadRequest.emit(''));
  }

}

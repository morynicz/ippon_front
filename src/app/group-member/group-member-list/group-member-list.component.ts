import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from '../../team/team';
import { GroupMemberService, MemberScore } from '../group-member.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'ippon-group-member-list',
  templateUrl: './group-member-list.component.html',
  styleUrls: ['./group-member-list.component.css']
})
export class GroupMemberListComponent implements OnInit, OnChanges {
  @Input() teams: Team[] = [];
  @Input() groupId: number;
  @Input() isAuthorized: boolean = false;
  @Output() reloadRequest: EventEmitter<any> = new EventEmitter<any>();
  teamScores: Map<number, MemberScore> = new Map<number, MemberScore>();

  constructor(private groupMemberService: GroupMemberService) { }

  ngOnInit() {
    this.loadTeamScores();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadTeamScores();
  }
  private loadTeamScores() {
    forkJoin(this.teams.map(team =>
      this.groupMemberService.getScore({ group: this.groupId, team: team.id })))
      .subscribe((results: MemberScore[]) => {
        console.log(results);
        results.forEach((score: MemberScore) => this.teamScores.set(score.id, score));
      }
      );
  }

  reload(): void {
    this.reloadRequest.emit("");
  }

}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'ippon-team-line',
  templateUrl: './team-line.component.html',
  styleUrls: ['./team-line.component.css']
})
export class TeamLineComponent implements OnInit {
  @Input() team: Team;
  @Input() isAuthorized: boolean;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  deleteTeam(): void {
    this.teamService.delete(this.team)
      .subscribe(resp => this.reloadRequest.emit(''));
  }
}

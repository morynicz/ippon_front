import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'ippon-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {
  team: Team;
  @Input() tournamentId: number;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.team = new Team();
  }

  fillTeam(): void {
    this.team.id = 0;
    this.team.tournament = this.tournamentId;
  }

  save(): void {
    this.fillTeam();
    this.teamService.add(this.team).subscribe(resp => {
      this.reloadRequest.emit('');
    });
  }

}

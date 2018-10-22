import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ippon-tournament-team-list',
  templateUrl: './tournament-team-list.component.html',
  styleUrls: ['./tournament-team-list.component.css']
})
export class TournamentTeamListComponent implements OnInit {
  teams: Team[];
  tournamentId: number;
  isAuthorized: boolean = false;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.loadTeams();
    this.teamService.isAuthorized(this.tournamentId)
      .subscribe(response => this.isAuthorized = response);
  }

  private loadTeams() {
    this.teamService.getList(this.tournamentId)
      .subscribe(response => this.teams = response);
  }

  reload(): void {
    this.loadTeams();
  }

}

import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../../authorization/authorization.service';

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
    private authorizationService: AuthorizationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.loadTeams();
    this.authorizationService.isTournamentStaff(this.tournamentId)
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

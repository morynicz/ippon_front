import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/team';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';
import { TeamMemberService } from '../../team/team-member.service';
import { Player } from '../../player/player';
import { forkJoin, Observable } from 'rxjs';
import { TournamentParticipantService } from '../../tournament-participation/tournament-participant.service';
import { map, mergeMap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { fork } from 'child_process';

@Component({
  selector: 'ippon-tournament-team-list',
  templateUrl: './tournament-team-list.component.html',
  styleUrls: ['./tournament-team-list.component.css']
})
export class TournamentTeamListComponent implements OnInit {
  teams: Team[];
  tournamentId: number;
  isAuthorized: boolean = false;
  tournament: Tournament;
  constructor(
    private teamService: TeamService,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private tournamentParticipantService: TournamentParticipantService,
    private teamMemberService: TeamMemberService) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.loadTeams();
    this.tournamentService.isStaff(this.tournamentId)
      .subscribe(response => this.isAuthorized = response);
    this.tournamentService.get(this.tournamentId).subscribe((response: Tournament) => this.tournament = response);
  }

  private loadTeams() {
    this.teamService.getList(this.tournamentId)
      .subscribe(response => this.teams = response);
  }

  reload(): void {
    this.loadTeams();
  }

  generateTeams(): void {
    this.tournamentParticipantService.getNotAssigned(this.tournamentId).pipe(
      map((players: Player[]) => players.map(
        (player: Player) => this.teamService.add({ id: 0, members: [], tournament: this.tournamentId, name: player.name + " " + player.surname })
          .pipe(
            map((team: Team) =>
              this.teamMemberService.add({ player: player.id, team: team.id }))))),
      forkJoin,
      mergeMap((result: [[Observable<void>]]) => forkJoin(result[0]))
    ).subscribe(res => console.log(res));
  }
}

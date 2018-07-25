import { Component, OnInit } from '@angular/core';

import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';
import { AuthenticationService } from '../../authorization/authentication.service';

@Component({
  selector: 'ippon-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  tournaments: Tournament[];
  constructor(
    private tournamentService: TournamentService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getTournaments();
  }

  getTournaments(): void {
    this.tournamentService.getList().subscribe(
      tournaments => { this.tournaments = tournaments; },
      error => this.handleError(error));
  }

  signedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private handleError(error): void {
    console.log(error);
  }
}

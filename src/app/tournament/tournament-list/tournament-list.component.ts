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
  isLoggedIn: boolean = false;
  constructor(
    private tournamentService: TournamentService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.getTournaments();
    this.authenticationService.isLoggedIn()
      .subscribe(resp => this.isLoggedIn = resp,
        error => this.handleError(error));
  }

  getTournaments(): void {
    this.tournamentService.getList().subscribe(
      tournaments => { this.tournaments = tournaments; },
      error => this.handleError(error));
  }

  private handleError(error): void {
    console.log(error);
  }
}

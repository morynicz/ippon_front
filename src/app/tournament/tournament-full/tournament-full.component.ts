import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'ippon-tournament-full',
  templateUrl: './tournament-full.component.html',
  styleUrls: ['./tournament-full.component.css']
})
export class TournamentFullComponent implements OnInit {
  tournament: Tournament;
  numericNone: NumericConstraint = NumericConstraint.None;
  sexNone: SexConstraint = SexConstraint.None;
  isAdmin: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private tournamentService: TournamentService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTournament(id);
    this.getAuthorization(id);
  }

  getTournament(id: number): void {
    this.tournamentService.get(id).subscribe(tournament => {
      this.tournament = tournament;
    }, error => this.handleError(error));
  }

  getAuthorization(id: number): void {
    this.authorizationService.isTournamentAdmin(id).subscribe(auth => {
      this.isAdmin = auth;
    }, error => this.handleError(error));
  }

  handleError(error): void {

  }

}

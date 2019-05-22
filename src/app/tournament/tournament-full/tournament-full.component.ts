import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';
import { GroupPhaseService } from '../../group-phase/group-phase.service';
import { GroupPhase } from '../../group-phase/group-phase';

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
  groupPhases: GroupPhase[];
  newGroupPhase: GroupPhase;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTournament(id);
    this.getAuthorization(id);
  }

  getTournament(id: number): void {
    this.tournamentService.get(id).subscribe(tournament => {
      this.tournament = tournament;
    }, () => this.handleError());
  }

  getAuthorization(id: number): void {
    this.tournamentService.isAuthorized(id).subscribe(auth => {
      this.isAdmin = auth;
    }, () => this.handleError());
  }

  handleError(): void {

  }

}

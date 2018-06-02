import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tournament } from '../tournament';
import { TournamentService } from '../tournament.service';
import { Rank, RANKS } from '../../rank';
import { Sex } from '../../sex';

import { NumericConstraint } from '../numeric-constraint';
import { SexConstraint } from '../sex-constraint';

@Component({
  selector: 'ippon-tournament-form',
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {
  tournament: Tournament;
  numericConstraints: NumericConstraint[] = [
    NumericConstraint.None,
    NumericConstraint.Less,
    NumericConstraint.LessOrEqual,
    NumericConstraint.Greater,
    NumericConstraint.GreaterOrEqual,
    NumericConstraint.Equal,
    NumericConstraint.NotEqual
  ];
  sexConstraints: SexConstraint[] = [
    SexConstraint.None,
    SexConstraint.WomenOnly,
    SexConstraint.MenOnly
  ];

  ranks: Rank[] = RANKS;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.getTournament();
    } else {
      this.initializeTournament();
    }
  }

  initializeTournament(): void {
    this.tournament = new Tournament();
  }

  getTournament(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tournamentService.getTournament(id)
      .subscribe(tournament => this.tournament = tournament);
  }

  numericConstraintCompare(lhs: NumericConstraint, rhs: NumericConstraint): boolean {
    return lhs == rhs;
  }

  sexConstraintCompare(lhs: SexConstraint, rhs: SexConstraint): boolean {
    return lhs == rhs;
  }

  rankCompare(lhs: Rank, rhs: Rank): boolean {
    return lhs == rhs;
  }

  save(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.tournamentService.updateTournament(this.tournament).subscribe(() => this.goBack());
    } else {
      this.tournamentService.addTournament(this.tournament).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}

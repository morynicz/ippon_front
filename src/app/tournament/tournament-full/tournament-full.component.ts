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
    private tournamentService: TournamentService,
    private groupPhaseService: GroupPhaseService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getTournament(id);
    this.getAuthorization(id);
    this.loadGroupPhases(id);
    this.prepareNewGroupPhase(id);
  }

  private prepareNewGroupPhase(id: number) {
    this.newGroupPhase = new GroupPhase();
    this.newGroupPhase.tournament = id;
  }

  private loadGroupPhases(id: number) {
    this.groupPhaseService.getList(id).subscribe(response => {
      this.groupPhases = response;
    }, () => this.handleError());
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

  reloadGroupPhases(): void {
    this.loadGroupPhases(this.tournament.id);
  }

  reloadGroupPhasesAfterCreation(): void {
    this.reloadGroupPhases();
    this.prepareNewGroupPhase(this.tournament.id);
  }

  handleError(): void {

  }

}

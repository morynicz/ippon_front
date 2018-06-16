import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TournamentParticipationFormComponent } from '../tournament-participation-form/tournament-participation-form.component';

import { Player } from '../../player/player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { TournamentParticipation } from '../tournament-participation';
import { TournamentParticipantService } from '../tournament-participant.service';

@Component({
  selector: 'ippon-tournament-participation-list',
  templateUrl: './tournament-participation-list.component.html',
  styleUrls: ['./tournament-participation-list.component.css']
})
export class TournamentParticipationListComponent implements OnInit {
  participations: TournamentParticipation[];
  non_participants: Player[];
  tournamentId: number;

  constructor(
    private participationService: TournamentParticipantService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.reload();
  }

  reload(): void {
    this.loadParticipations();
    this.loadNonParticipants();
  }

  loadParticipations(): void {
    this.participationService.getParticipations(this.tournamentId)
      .subscribe(participations => this.participations = participations);
  }

  loadNonParticipants(): void {
    this.participationService.getNonParticipants(this.tournamentId)
      .subscribe(non_participants => this.non_participants = non_participants);
  }

  addParticipant(player: Player): void {
    this.participationService.addParticipation(this.tournamentId, {
      player: player,
      tournament_id: this.tournamentId,
      is_paid: false,
      is_registered: false,
      is_qualified: false,
      is_sex_ok: false,
      is_rank_ok: false,
      is_age_ok: false,
      id: 0,
      notes: ''
    }).subscribe(resp => {
      this.loadParticipations();
      this.loadNonParticipants();
    });
  }

}

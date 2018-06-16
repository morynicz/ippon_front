import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Player } from '../../player/player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { TournamentParticipation } from '../tournament-participation';
import { TournamentParticipantService } from '../tournament-participant.service';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';

@Component({
  selector: 'ippon-tournament-participation-form',
  templateUrl: './tournament-participation-form.component.html',
  styleUrls: ['./tournament-participation-form.component.css']
})
export class TournamentParticipationFormComponent implements OnInit {
  @Input() participation: TournamentParticipation;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(
    private participationService: TournamentParticipantService
  ) { }

  ngOnInit() {
  }
  save(): void {
    this.participationService.updateParticipation(this.participation)
      .subscribe(part => this.participation = part);
  }
  delete(): void {
    let tournamentId: number = this.participation.tournament_id;
    this.participationService.deleteParticipation(this.participation)
      .subscribe(resp => {
        this.reloadRequest.emit('');
      });
  }
}

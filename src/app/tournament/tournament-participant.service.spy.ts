import { TournamentParticipation } from './tournament-participation';
import { Player } from '../player/player';

import { Observable ,  of } from 'rxjs';

export class TournamentParticipantServiceSpy {
  addParticipationId: number;
  addParticipationValue: TournamentParticipation;
  addParticipation(tournamentId: number, participation: TournamentParticipation):
    Observable<TournamentParticipation> {
    this.addParticipationId = tournamentId;
    this.addParticipationValue = participation;
    return of(participation);
  }

  getParticipationsValue: number;
  getParticipationsReturnValue: TournamentParticipation[];
  getParticipations(id: number): Observable<TournamentParticipation[]> {
    this.getParticipationsValue = id;
    return of(this.getParticipationsReturnValue);
  }

  updateParticiaptionValue: TournamentParticipation;
  updateParticipationReturnValue: TournamentParticipation;
  updateParticipation(participation: TournamentParticipation): Observable<TournamentParticipation> {
    this.updateParticiaptionValue = participation;
    return of(this.updateParticipationReturnValue);
  }

  deleteParticipationValue: TournamentParticipation;
  deleteParticipation(participation: TournamentParticipation): Observable<any> {
    this.deleteParticipationValue = participation;
    return of('');
  }

  getNonParticipantsValue: number;
  getNonParticipantsReturnValue: Player[];
  getNonParticipants(id: number): Observable<Player[]> {
    this.getNonParticipantsValue = id;
    return of(this.getNonParticipantsReturnValue);
  }

}

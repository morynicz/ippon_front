import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Tournament } from './tournament';
import { Player } from '../player/player';
import { TournamentParticipation } from './tournament-participation';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  PARTICIPANTS_ENDPOINT
} from '../rest-api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentParticipantService {
  private tournamentsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT;
  private getParticipationsUrl(id: number): string {
    return `${this.tournamentsUrl}${id}/` + PARTICIPANTS_ENDPOINT;
  }

  private participationUrl = IPPON_HOST + PARTICIPANTS_ENDPOINT;

  private getParticipationUrl(id: number): string {
    return `${this.participationUrl}${id}/`;
  }

  constructor(private http: HttpClient) { }

  addParticipation(tournamentId: number, participation: TournamentParticipation):
    Observable<TournamentParticipation> {
    return this.http.post<TournamentParticipation>(
      this.getParticipationsUrl(tournamentId), participation, httpOptions)
      .pipe(catchError(this.handleError<any>('addParticipation')));
  }

  getParticipations(tournamentId: number): Observable<TournamentParticipation[]> {
    return this.http.get<TournamentParticipation>(
      this.getParticipationsUrl(tournamentId), httpOptions)
      .pipe(catchError(this.handleError<any>('getParticipations')));
  }

  updateParticipation(participation: TournamentParticipation):
    Observable<TournamentParticipation> {
    return this.http.put<TournamentParticipation>(
      this.getParticipationUrl(participation.id), participation, httpOptions)
      .pipe(catchError(this.handleError<any>('updateParticipation')));
  }

  deleteParticipation(participation: TournamentParticipation): Observable<TournamentParticipation> {
    return this.http.delete<{}>(
      this.getParticipationUrl(participation.id), httpOptions)
      .pipe(catchError(this.handleError<any>('deleteParticipation')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
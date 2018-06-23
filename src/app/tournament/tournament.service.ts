import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentService {
  private tournamentsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT;
  private getTournamentUrl(id: number): string {
    return `${this.tournamentsUrl}${id}/`;
  }

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournament>(this.tournamentsUrl, httpOptions)
      .pipe(catchError(this.handleError<any>('getTournaments')));
  }

  getTournament(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(
      this.getTournamentUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>(`getTournament id=${id}`)));
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(
      this.tournamentsUrl, tournament, httpOptions)
      .pipe(catchError(this.handleError<any>('addTournament')));
  }

  updateTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.put<Tournament>(
      this.getTournamentUrl(tournament.id), tournament, httpOptions)
      .pipe(catchError(this.handleError<any>('updateTournament')));
  }

  deleteTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.delete<{}>(
      this.getTournamentUrl(tournament.id), httpOptions)
      .pipe(catchError(this.handleError<any>('updateParticipation')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

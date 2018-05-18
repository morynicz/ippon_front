import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentService {
  private tournamentsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT;

  constructor(private http: HttpClient) { }

  getTournaments(): Observable<Tournament[]> {
    return this.http.get<Tournaments>(this.tournamentsUrl, httpOptions)
      .pipe(catchError(this.handleError('getTournaments')));
  }

  getTournament(id: number): Observable<Tournament> {
    const url = `${this.tournamentsUrl}${id}/`;
    return this.http.get<Tournament>(url, httpOptions)
      .pipe(catchError(this.handleError<any>(`getTournament id=${id}`)));
  }

  addTournament(tournament: Tournament): Observable<Tournament> {
    return this.http.post<Tournament>(
      this.tournamentsUrl, tournament, httpOptions)
      .pipe(catchError(this.handleError<any>('addTournament')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
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
      .pipe(catchError(this.handleError<any>('updateTournament')));
  }

  private getAdminsUrl(tournamentId: number): string {
    return this.getTournamentUrl(tournamentId) + ADMINS_ENDPOINT;
  }

  getAdmins(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.getAdminsUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('getAdmins')));
  }

  addAdmin(id: number, admin: User): Observable<User> {
    return this.http.post<User>(
      this.getAdminsUrl(id), admin, httpOptions)
      .pipe(catchError(this.handleError<any>('addAdmin')));
  }

  deleteAdmin(tournamentId: number, adminId: number): Observable<{}> {
    return this.http.delete<{}>(
      this.getAdminsUrl(tournamentId) + adminId + '/', httpOptions)
      .pipe(catchError(this.handleError<any>('deleteAdmin')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

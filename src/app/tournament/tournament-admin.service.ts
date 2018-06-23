import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT,
  TOURNAMENT_ADMINS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { TournamentAdmin } from './tournament-admin';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentAdminService {
  private getAdminsUrl(tournamentId: number): string {
    return IPPON_HOST + TOURNAMENTS_ENDPOINT +
      `${tournamentId}/` + ADMINS_ENDPOINT;
  }

  private adminUrl: string = IPPON_HOST + TOURNAMENT_ADMINS_ENDPOINT;

  private getAdminUrl(id: number): string {
    return this.adminUrl + `${id}/`;
  }

  constructor(private http: HttpClient) { }

  getAdmins(id: number): Observable<TournamentAdmin[]> {
    return this.http.get<TournamentAdmin[]>(
      this.getAdminsUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('getAdmins')));
  }

  addAdmin(admin: TournamentAdmin): Observable<TournamentAdmin> {
    return this.http.post<TournamentAdmin>(
      this.adminUrl, admin, httpOptions)
      .pipe(catchError(this.handleError<any>('addAdmin')));
  }

  updateAdmin(admin: TournamentAdmin): Observable<TournamentAdmin> {
    return this.http.put<TournamentAdmin>(
      this.getAdminUrl(admin.id), admin, httpOptions)
      .pipe(catchError(this.handleError<any>('addAdmin')));
  }


  deleteAdmin(id: number): Observable<{}> {
    return this.http.delete<{}>(
      this.getAdminUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('deleteAdmin')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

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
export class TournamentAdminService {
  private getAdminsUrl(tournamentId: number): string {
    return IPPON_HOST + TOURNAMENTS_ENDPOINT +
      `${tournamentId}/` + ADMINS_ENDPOINT;
  }

  constructor(private http: HttpClient) { }

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

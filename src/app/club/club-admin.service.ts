import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  CLUBS_ENDPOINT,
  ADMINS_ENDPOINT,
  CLUB_ADMINS_ENDPOINT,
  NON_ADMINS_ENDPOINT
} from '../rest-api';

import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ClubAdminService {

  private getAdminsUrl(clubId: number): string {
    return IPPON_HOST + CLUBS_ENDPOINT +
      `${clubId}/` + ADMINS_ENDPOINT;
  }

  private getNonAdminsUrl(clubId: number): string {
    return IPPON_HOST + CLUBS_ENDPOINT +
      `${clubId}/` + NON_ADMINS_ENDPOINT;
  }

  private adminUrl: string = IPPON_HOST + CLUB_ADMINS_ENDPOINT;

  private getAdminUrl(id: number): string {
    return this.adminUrl + `${id}/`;
  }

  constructor(private http: HttpClient) { }

  getAdmins(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.getAdminsUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('getAdmins')));
  }

  getNonAdmins(id: number): Observable<User[]> {
    return this.http.get<User[]>(
      this.getNonAdminsUrl(id), httpOptions)
      .pipe(catchError(this.handleError<any>('getNonAdmins')));
  }

  addAdmin(admin: User): Observable<User> {
    return this.http.post<User>(
      this.adminUrl, admin, httpOptions)
      .pipe(catchError(this.handleError<any>('addAdmin')));
  }

  updateAdmin(admin: User): Observable<User> {
    return this.http.put<User>(
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

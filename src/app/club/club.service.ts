import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Club } from './club'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ClubService {
  private clubsUrl = "http://localhost:8000/ippon/clubs/";

  constructor(private http: HttpClient) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.clubsUrl, httpOptions)
      .pipe(catchError(this.handleError('getClubs', [])));
  }

  getClub(id: number): Observable<Club> {
    const url = `${this.clubsUrl}${id}/`;
    return this.http.get<Club>(url, httpOptions)
      .pipe(catchError(this.handleError(`getClub id=${id}`, new Club())));
  }

  updateClub(club: Club): Observable<any> {
    const url = `${this.clubsUrl}${club.id}/`;
    return this.http.put(url, club, httpOptions).pipe(catchError(this.handleError<any>('updateClub')));
  }

  addClub(club: Club): Observable<Club> {
    return this.http.post(this.clubsUrl, club, httpOptions).pipe(catchError(this.handleError<any>('addClub')));
  }

  deleteClub(club: Club): Observable<Club> {
    const url = `${this.clubsUrl}${club.id}/`;
    return this.http.delete<Club>(url, httpOptions).pipe(
      catchError(this.handleError<Club>('deleteClub'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

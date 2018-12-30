import { Injectable } from '@angular/core';
import { TeamMember } from './team-member';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IPPON_HOST, TEAMS_ENDPOINT, MEMBERS_ENDPOINT, NOT_ASSIGNED_ENDPOINT } from '../rest-api';
import { Player } from '../player/player';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TeamMemberService {
  private getTeamsUrl(id: number): string {
    return IPPON_HOST + TEAMS_ENDPOINT + `${id}/` + MEMBERS_ENDPOINT;
  }

  private getMemberUrl(teamMember: TeamMember): string {
    return this.getTeamsUrl(teamMember.team) + `${teamMember.player}/`;
  }

  constructor(
    protected http: HttpClient
  ) { }
  add(resource: TeamMember): Observable<void> {
    return this.http.post(this.getMemberUrl(resource), null, httpOptions)
      .pipe(catchError(this.handleError<any>('add id=${resource.id}')));
  }

  getList(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(
      this.getTeamsUrl(id), httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }

  delete(resource: TeamMember): Observable<{}> {
    return this.http.delete<{}>(this.getMemberUrl(resource), httpOptions)
      .pipe(
        catchError(this.handleError<{}>('delete id=${resource}'))
      );
  }

  getNotAssigned(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(
      IPPON_HOST + TEAMS_ENDPOINT + `${id}/` + NOT_ASSIGNED_ENDPOINT, httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error("operation: " + operation + " error: " + error);
      return of(result as T);
    };
  }
}

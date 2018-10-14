import { Injectable } from '@angular/core';
import { TeamMember } from './team-member';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IPPON_HOST, TEAMS_ENDPOINT, MEMBERS_ENDPOINT } from '../rest-api';
import { Player } from '../player/player';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TeamMemberService {
  private getUrl(id: number): string {
    return IPPON_HOST + TEAMS_ENDPOINT + `${id}/` + MEMBERS_ENDPOINT;
  }

  constructor(
    protected http: HttpClient
  ) { }
  add(resource: TeamMember): Observable<TeamMember> {
    return this.http.post(this.getUrl(resource.team), resource, httpOptions)
      .pipe(catchError(this.handleError<any>('add id=${resource.id}')));
  }

  getList(id: number): Observable<Player[]> {
    return this.http.get<Player[]>(
      this.getUrl(id), httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

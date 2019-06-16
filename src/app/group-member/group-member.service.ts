import { Injectable } from '@angular/core';
import { IPPON_HOST, GROUPS_ENDPOINT, MEMBERS_ENDPOINT, NOT_ASSIGNED_ENDPOINT } from '../rest-api';
import { GroupMember } from './group-member';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Team } from '../team/team';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

export class MemberScore {
  wins: number;
  draws: number;
  points: number;
}

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {

  private getGroupsUrl(id: number): string {
    return IPPON_HOST + GROUPS_ENDPOINT + `${id}/` + MEMBERS_ENDPOINT;
  }

  private getMemberUrl(groupMember: GroupMember): string {
    return this.getGroupsUrl(groupMember.group) + `${groupMember.team}/`;
  }

  constructor(
    protected http: HttpClient
  ) { }
  add(resource: GroupMember): Observable<void> {
    return this.http.post(this.getMemberUrl(resource), null, httpOptions)
      .pipe(catchError(this.handleError<any>('add id=${resource.id}')));
  }

  getList(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      this.getGroupsUrl(id), httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }

  delete(resource: GroupMember): Observable<{}> {
    return this.http.delete<{}>(this.getMemberUrl(resource), httpOptions)
      .pipe(
        catchError(this.handleError<{}>('delete id=${resource}'))
      );
  }

  getNotAssigned(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(
      IPPON_HOST + GROUPS_ENDPOINT + `${id}/` + NOT_ASSIGNED_ENDPOINT, httpOptions)
      .pipe(catchError(this.handleError('getList', [])));
  }

  getScore(resource: GroupMember): Observable<MemberScore> {
    return this.http.get<MemberScore>(this.getMemberUrl(resource) + 'score', httpOptions);
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}

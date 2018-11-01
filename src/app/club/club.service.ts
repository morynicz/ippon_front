import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Club } from './club';
import { User } from '../user';
import { Player } from '../player/player';

import {
  IPPON_HOST,
  CLUBS_ENDPOINT,
  ADMINS_ENDPOINT,
  PLAYERS_ENDPOINT
} from '../rest-api';
import { CrudlService } from '../crudl.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ClubService extends CrudlService<Club>{
  private clubsUrl = IPPON_HOST + CLUBS_ENDPOINT;

  constructor(protected http: HttpClient) {
    super(http, IPPON_HOST + CLUBS_ENDPOINT);
  }

  getPlayers(clubId: number): Observable<Player[]> {
    const url = `${this.clubsUrl}${clubId}/${PLAYERS_ENDPOINT}`;
    return this.http.get<Player[]>(url, httpOptions)
      .pipe(catchError(this.handleError(`getPlayers id=${clubId}`, new Array<Player>())));
  }
}

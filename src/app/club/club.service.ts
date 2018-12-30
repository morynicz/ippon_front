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
  PLAYERS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { CrudlaService } from '../crudla.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class ClubService extends CrudlaService<Club>{
  private clubsUrl = IPPON_HOST + CLUBS_ENDPOINT;

  constructor(protected http: HttpClient) {
    super(http,
      IPPON_HOST + CLUBS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + CLUBS_ENDPOINT);
  }

  getPlayers(clubId: number): Observable<Player[]> {
    const url = `${this.clubsUrl}${clubId}/${PLAYERS_ENDPOINT}`;
    return this.http.get<Player[]>(url, httpOptions)
      .pipe(catchError(this.handleError(`getPlayers id=${clubId}`, new Array<Player>())));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from './player';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT
} from '../rest-api';
import { CrudlService } from '../crudl.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class PlayerService extends CrudlService<Player> {
  private playersUrl = IPPON_HOST + PLAYERS_ENDPOINT;
  constructor(protected http: HttpClient) {
    super(http, IPPON_HOST + PLAYERS_ENDPOINT);
  }
}

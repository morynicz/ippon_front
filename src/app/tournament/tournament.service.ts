import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { User } from '../user';
import { CrudService } from '../crud.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()
export class TournamentService extends CrudService<Tournament>{
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + TOURNAMENTS_ENDPOINT)
  }
}

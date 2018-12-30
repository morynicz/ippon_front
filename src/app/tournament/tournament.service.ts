import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { CrudlaService } from '../crudla.service';

@Injectable()
export class TournamentService extends CrudlaService<Tournament>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + TOURNAMENTS_ENDPOINT)
  }
}

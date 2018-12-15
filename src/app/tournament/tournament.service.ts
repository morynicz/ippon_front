import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { CrudlService } from '../crudl.service';

@Injectable()
export class TournamentService extends CrudlService<Tournament>{
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + TOURNAMENTS_ENDPOINT)
  }
}

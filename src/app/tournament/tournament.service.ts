import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT
} from '../rest-api';

import { Tournament } from './tournament';
import { User } from '../user';
import { CrudService } from '../crud.service';

@Injectable()
export class TournamentService extends CrudService<Tournament>{
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + TOURNAMENTS_ENDPOINT)
  }
}

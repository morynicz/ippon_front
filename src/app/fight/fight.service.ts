import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from '../crud.service';
import { Fight } from './fight';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT
} from '../rest-api';

@Injectable()
export class FightService extends CrudService<Fight> {
  constructor(http: HttpClient) {
    super(http, IPPON_HOST + FIGHTS_ENDPOINT);
  }
}

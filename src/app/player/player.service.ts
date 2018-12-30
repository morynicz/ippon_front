import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Player } from './player';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { RldaService } from '../rlda.service';


@Injectable()
export class PlayerService extends RldaService<Player> {
  constructor(protected http: HttpClient) {
    super(http,
      IPPON_HOST + PLAYERS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + PLAYERS_ENDPOINT);
  }
}

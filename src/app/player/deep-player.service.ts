import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  IPPON_HOST,
  PLAYERS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { CrudlaService } from '../crudla.service';
import { DeepPlayer } from './deep-player';


@Injectable()
export class DeepPlayerService extends CrudlaService<DeepPlayer> {
  constructor(protected http: HttpClient) {
    super(http,
      IPPON_HOST + PLAYERS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + PLAYERS_ENDPOINT);
  }
}

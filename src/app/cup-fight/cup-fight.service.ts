import { Injectable } from '@angular/core';
import { CrudfaService } from '../crudfa.service';
import { CupFight } from './cup-fight';
import { IPPON_HOST, CUP_FIGHTS_ENDPOINT, CUP_PHASES_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CupFightService extends CrudfaService<CupFight>{

  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + CUP_FIGHTS_ENDPOINT,
      IPPON_HOST + CUP_PHASES_ENDPOINT,
      CUP_FIGHTS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + CUP_FIGHTS_ENDPOINT
    );
  }
}

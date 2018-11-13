import { Injectable } from '@angular/core';
import { TEAMS_ENDPOINT, IPPON_HOST, TOURNAMENTS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpClient } from '@angular/common/http';
import { Team } from './team';
import { CrudfaService } from '../crudfa.service';

@Injectable()// FUCK TYPESCRIPT
export class TeamService extends CrudfaService<Team>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAMS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAMS_ENDPOINT,
      IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAMS_ENDPOINT
    );
  }
}
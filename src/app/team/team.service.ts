import { Injectable } from '@angular/core';
import { TEAMS_ENDPOINT, IPPON_HOST, TOURNAMENTS_ENDPOINT } from '../rest-api';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CrudfService } from '../crudf.service';
import { Team } from './team';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable()// FUCK TYPESCRIPT
export class TeamService extends CrudfService<Team>{
  constructor(http: HttpClient) {
    super(http,
      IPPON_HOST + TEAMS_ENDPOINT,
      IPPON_HOST + TOURNAMENTS_ENDPOINT,
      TEAMS_ENDPOINT);
  }
}
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { FightService } from './fight.service';
import { Fight } from './fight';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { FightWinner } from '../fight-winner';
import { FightStatus } from '../fight-status';

const fightsUrl = IPPON_HOST + FIGHTS_ENDPOINT;
const fight: Fight = {
  id: 3,
  points: [],
  aka: 5,
  shiro: 7,
  team_fight: 33,
  orderingNumber: 0,
  winner: FightWinner.Aka,
  status: FightStatus.Finished
}


describe('FightService', () => {
  let service: FightService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FightService]
    });

    service = TestBed.get(FightService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the fights api url",
      () => {
        service.add(fight).subscribe();
        const req = backend.expectOne(fightsUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        req.flush(fight);
      });
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + FIGHTS_ENDPOINT + `${fight.id}/`;
    it("calls the fights api url and returns requested authorization",
      () => {
        service.isAuthorized(fight.id)
          .subscribe(response => expect(response)
            .toBe(true));
        const req = backend.expectOne(fightAuthUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
      });
  });
});

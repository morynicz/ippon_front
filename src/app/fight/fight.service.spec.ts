import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { FightService } from './fight.service';
import { Fight } from './fight';
import { Point } from '../point/point';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT,
  AUTHENTICATION_HOST,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';

const fightsUrl = IPPON_HOST + FIGHTS_ENDPOINT;
const fight: Fight = {
  id: 3,
  points: [],
  aka: 5,
  shiro: 7,
  team_fight: 33,
  orderingNumber: 0
}


describe('FightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FightService]
    });
  });

  it('should be created', inject([FightService], (service: FightService) => {
    expect(service).toBeTruthy();
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe("when add is called", () => {
    it("calls the fights api url",
      inject(
        [FightService, HttpTestingController],
        (service: FightService,
          backend: HttpTestingController) => {
          service.add(fight).subscribe();
          const req = backend.expectOne(fightsUrl);
        }));
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + FIGHTS_ENDPOINT + `${fight.id}/`;
    it("calls the fights api url",
      inject(
        [FightService, HttpTestingController],
        (service: FightService,
          backend: HttpTestingController) => {
          service.isAuthorized(fight.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
        }));
    it("uses isAuthorized method",
      inject(
        [FightService, HttpTestingController],
        (service: FightService,
          backend: HttpTestingController) => {
          service.isAuthorized(fight.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("responds with requested fight",
      inject(
        [FightService, HttpTestingController],
        (service: FightService,
          backend: HttpTestingController) => {
          service.isAuthorized(fight.id)
            .subscribe(response => expect(response)
              .toBe(true));
          const req = backend.expectOne(fightAuthUrl);
          req.flush({ "isAuthorized": true });
        }));
  })
});

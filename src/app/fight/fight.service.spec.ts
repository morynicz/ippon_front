import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { FightService } from './fight.service';
import { Fight } from './fight';
import { Point } from '../point/point';

import {
  IPPON_HOST,
  FIGHTS_ENDPOINT
} from '../rest-api';

const fightsUrl = IPPON_HOST + FIGHTS_ENDPOINT;
const fight: Fight = {
  id: 3,
  points: [],
  akaId: 5,
  shiroId: 7,
  teamFightId: 33,
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
});

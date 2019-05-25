import { TestBed } from '@angular/core/testing';

import { CupFightService } from './cup-fight.service';
import { CupFight } from './cup-fight';
import { IPPON_HOST, AUTHORIZATION_ENDPOINT, CUP_FIGHTS_ENDPOINT, CUP_PHASES_ENDPOINT } from '../rest-api';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

const teamFightId: number = 32;
const cupPhaseId: number = 78;
const cupFight: CupFight = {
  id: 34,
  team_fight: teamFightId,
  cup_phase: cupPhaseId,
  previous_aka_fight: 23,
  previous_shiro_fight: 43
}

const cupFightUrl: string = IPPON_HOST + CUP_FIGHTS_ENDPOINT;

describe('CupFightService', () => {
  let service: CupFightService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CupFightService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(CupFightService);
    backend = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the cup fights api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the cup fightto be created in body \
    returns newly added cup fight",
      () => {
        service.add(cupFight)
          .subscribe(response => expect(response).toBe(cupFight));
        const req = backend.expectOne(cupFightUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(cupFight);
        req.flush(cupFight);
      });
  });

  describe("when delete is called", () => {
    it("calls the cup fight api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(cupFight)
          .subscribe();
        const req = backend.expectOne(cupFightUrl + cupFight.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });


  describe("when getList is called", () => {
    let filteredUrl = IPPON_HOST + CUP_PHASES_ENDPOINT + `${cupPhaseId}/` + CUP_FIGHTS_ENDPOINT;
    let cupFights: CupFight[] = [
      cupFight,
      {
        id: 2,
        cup_phase: cupPhaseId,
        team_fight: 894,
        previous_aka_fight: 78,
        previous_shiro_fight: 23
      }];

    it("calls the cups fights api url, uses GET method, \
      sends request with application/json content type headers \
      and responds with requested cup fights",
      () => {
        service.getList(cupPhaseId)
          .subscribe(response => expect(response)
            .toBe(cupFights));
        const req = backend.expectOne(filteredUrl);
        req.flush(cupFights);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + CUP_FIGHTS_ENDPOINT + `${cupFight.id}/`;
    it("calls the fights api url, uses GET method \
    and returns authorization",
      () => {
        service.isAuthorized(cupFight.id)
          .subscribe(response => {
            expect(response).toBe(true)
          });
        const req = backend.expectOne(authUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
      });
  });
});

import { TestBed } from '@angular/core/testing';

import { CupPhaseService } from './cup-phase.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CupPhase } from './cup-phase';
import { IPPON_HOST, TOURNAMENTS_ENDPOINT, CUP_PHASES_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';

const tournamentId: number = 32;
const cupPhaseId: number = 879;
const cupPhase: CupPhase = {
  tournament: tournamentId,
  fight_length: 3,
  final_fight_length: 4,
  name: "CP",
  id: cupPhaseId
}

const cupPhases: CupPhase[] = [
  cupPhase,
  {
    tournament: tournamentId,
    fight_length: 3,
    final_fight_length: 4,
    name: "CP",
    id: cupPhaseId
  }
];

const baseUrl = IPPON_HOST + CUP_PHASES_ENDPOINT;
let filteredUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + CUP_PHASES_ENDPOINT;

describe('CupPhaseService', () => {
  let service: CupPhaseService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(CupPhaseService);
    backend = TestBed.get(HttpTestingController);
  });

  describe("when add is called", () => {
    it("calls the group phases api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the group phase to be created in body \
    returns newly added group phase",
      () => {
        service.add(cupPhase)
          .subscribe(response => expect(response).toBe(cupPhase));
        const req = backend.expectOne(baseUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(cupPhase);
        req.flush(cupPhase);
      });
  });

  describe("when delete is called", () => {
    it("calls the group phase api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(cupPhase)
          .subscribe();
        const req = backend.expectOne(baseUrl + cupPhase.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getList is called", () => {
    it("calls the group phases api url, uses GET method, \
    sends request with application/json content type headers \
    and responds with requested group phases",
      () => {
        service.getList(tournamentId)
          .subscribe(response => expect(response)
            .toBe(cupPhases));
        const req = backend.expectOne(filteredUrl);
        req.flush(cupPhases);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when update is called", () => {
    it("calls the groups api url, uses PUT method, \
    sends request with application/json content type headers \
    sends the group to be updated in body \
    and returns updated group",
      () => {
        service.update(cupPhase)
          .subscribe(response => expect(response)
            .toBe(cupPhase));
        const req = backend.expectOne(
          baseUrl + cupPhase.id + '/');
        req.flush(cupPhase);
        expect(req.request.body).toBe(cupPhase);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT
      + CUP_PHASES_ENDPOINT + `${cupPhase.id}/`;
    it("calls the group phases api url, uses GET method \
      and returns authorization",
      () => {
        service.isAuthorized(cupPhase.id)
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

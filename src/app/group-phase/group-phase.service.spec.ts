import { TestBed, inject } from '@angular/core/testing';

import { GroupPhaseService } from './group-phase.service';
import { GroupPhase } from './group-phase';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { IPPON_HOST, GROUP_PHASES_ENDPOINT, TOURNAMENTS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';

const tournamentId: number = 32;
const groupPhaseId: number = 567;
const groupPhase: GroupPhase = {
  tournament: tournamentId,
  id: groupPhaseId,
  fight_length: 4,
  name: "gp1"
}
const groupPhaseUrl = IPPON_HOST + GROUP_PHASES_ENDPOINT;
let filteredUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + GROUP_PHASES_ENDPOINT;
let groupPhases: GroupPhase[] = [
  groupPhase,
  {
    id: 22,
    tournament: tournamentId,
    fight_length: 5,
    name: "gp2"
  }];

describe('GroupPhaseService', () => {
  let service: GroupPhaseService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupPhaseService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(GroupPhaseService);
    backend = TestBed.get(HttpTestingController);
  });

  describe("when add is called", () => {
    it("calls the group phases api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the group phase to be created in body \
    returns newly added group phase",
      () => {
        service.add(groupPhase)
          .subscribe(response => expect(response).toBe(groupPhase));
        const req = backend.expectOne(groupPhaseUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(groupPhase);
        req.flush(groupPhase);
      });
  });

  describe("when delete is called", () => {
    it("calls the group phase api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(groupPhase)
          .subscribe();
        const req = backend.expectOne(groupPhaseUrl + groupPhase.id + '/');
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
            .toBe(groupPhases));
        const req = backend.expectOne(filteredUrl);
        req.flush(groupPhases);
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
        service.update(groupPhase)
          .subscribe(response => expect(response)
            .toBe(groupPhase));
        const req = backend.expectOne(
          groupPhaseUrl + groupPhase.id + '/');
        req.flush(groupPhase);
        expect(req.request.body).toBe(groupPhase);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT
      + GROUP_PHASES_ENDPOINT + `${groupPhase.id}/`;
    it("calls the group phases api url, uses GET method \
      and returns authorization",
      () => {
        service.isAuthorized(groupPhase.id)
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

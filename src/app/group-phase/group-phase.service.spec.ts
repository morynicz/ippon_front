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
  fight_length: 4
}
const groupPhaseUrl = IPPON_HOST + GROUP_PHASES_ENDPOINT;
let filteredUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + GROUP_PHASES_ENDPOINT;
let groupPhases: GroupPhase[] = [
  groupPhase,
  {
    id: 22,
    tournament: tournamentId,
    fight_length: 5
  }];

describe('GroupPhaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupPhaseService],
      imports: [HttpClientTestingModule]
    });
  });

  describe("when add is called", () => {
    it("calls the groupPhases api url",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.add(groupPhase)
            .subscribe();
        }));
    it("uses POST method",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.add(groupPhase)
            .subscribe();
          const req = backend.expectOne(groupPhaseUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.add(groupPhase)
            .subscribe();
          const req = backend.expectOne(groupPhaseUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added groupPhase",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.add(groupPhase)
            .subscribe(response => expect(response).toBe(groupPhase));
          const req = backend.expectOne(groupPhaseUrl);
          req.flush(groupPhase);
        }));
    it("sends the groupPhase to be created in body",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.add(groupPhase)
            .subscribe();
          const req = backend.expectOne(groupPhaseUrl);
          expect(req.request.body).toBe(groupPhase);
        }));
  });

  describe("when delete is called", () => {
    it("calls the tournaments api url",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.delete(groupPhase)
            .subscribe();
        }));
    it("uses DELETE method",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.delete(groupPhase)
            .subscribe();
          const req = backend.expectOne(groupPhaseUrl + groupPhase.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.delete(groupPhase)
            .subscribe();
          const req = backend.expectOne(groupPhaseUrl + groupPhase.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });

  describe("when getList is called", () => {
    it("calls the resources api url",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
        }));
    it("uses GET method",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested groupPhases",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.getList(tournamentId)
            .subscribe(response => expect(response)
              .toBe(groupPhases));
          const req = backend.expectOne(filteredUrl);
          req.flush(groupPhases);
        }));
  });

  describe("when update is called", () => {
    it("calls the group phases api url",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.update(groupPhase).subscribe();
          const req = backend.expectOne(groupPhaseUrl + `${groupPhaseId}/`);
        }));
    it("uses PUT method",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.update(groupPhase).subscribe();
          const req = backend.expectOne(groupPhaseUrl + `${groupPhaseId}/`);
          expect(req.request.method).toBe('PUT');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.update(groupPhase).subscribe();
          const req = backend.expectOne(groupPhaseUrl + `${groupPhaseId}/`);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with updated group phase",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.update(groupPhase)
            .subscribe(response => expect(response)
              .toBe(groupPhase));
          const req = backend.expectOne(
            groupPhaseUrl + `${groupPhaseId}/`);
          req.flush(groupPhase);
        }));
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT
     + GROUP_PHASES_ENDPOINT + `${groupPhase.id}/`;
    it("calls the groupPhases api url",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupPhase.id).subscribe();
          const req = backend.expectOne(authUrl);
        }));
    it("uses isAuthorized method",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupPhase.id).subscribe();
          const req = backend.expectOne(authUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("responds with requested groupPhase authorization",
      inject(
        [GroupPhaseService, HttpTestingController],
        (service: GroupPhaseService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupPhase.id)
            .subscribe(response => expect(response)
              .toBe(true));
          const req = backend.expectOne(authUrl);
          req.flush({ "isAuthorized": true });
        }));
  });
});

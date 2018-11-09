import { TestBed, inject } from '@angular/core/testing';

import { GroupService } from './group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Group } from './group';
import { IPPON_HOST, GROUP_PHASES_ENDPOINT, GROUPS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';

const groupPhaseId: number = 777;
const groupId: number = 96;

const group: Group = {
  name: "GA",
  group_phase: groupPhaseId,
  id: groupId
}

const groupUrl: string = IPPON_HOST + GROUPS_ENDPOINT;

describe('GroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupService],
      imports: [HttpClientTestingModule]
    });
  });

  describe("when add is called", () => {
    it("calls the team fights api url",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.add(group)
            .subscribe();
          const req = backend.expectOne(groupUrl);
        }));
    it("uses POST method",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.add(group)
            .subscribe();
          const req = backend.expectOne(groupUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.add(group)
            .subscribe();
          const req = backend.expectOne(groupUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added team fight",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.add(group)
            .subscribe(response => expect(response).toBe(group));
          const req = backend.expectOne(groupUrl);
          req.flush(group);
        }));
    it("sends the team fight to be created in body",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.add(group)
            .subscribe();
          const req = backend.expectOne(groupUrl);
          expect(req.request.body).toBe(group);
        }));
  });

  describe("when delete is called", () => {
    it("calls the team fight api url",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.delete(group)
            .subscribe();
          const req = backend.expectOne(groupUrl + group.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.delete(group)
            .subscribe();
          const req = backend.expectOne(groupUrl + group.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.delete(group)
            .subscribe();
          const req = backend.expectOne(groupUrl + group.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });

  describe("when getList is called", () => {
    let tournamentId: number = 3;
    let filteredUrl = IPPON_HOST + GROUP_PHASES_ENDPOINT + `${tournamentId}/` + GROUPS_ENDPOINT;
    let groups: Group[] = [
      group,
      {
        id: 2,
        name: "GB",
        group_phase: groupPhaseId
      }];

    it("calls the resources api url",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
        }));
    it("uses GET method",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested teams",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.getList(tournamentId)
            .subscribe(response => expect(response)
              .toBe(groups));
          const req = backend.expectOne(filteredUrl);
          req.flush(groups);
        }));
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUPS_ENDPOINT + `${group.id}/`;
    it("calls the fights api url",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.isAuthorized(group.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
        }));
    it("uses isAuthorized method",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.isAuthorized(group.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("responds with requested fight",
      inject(
        [GroupService, HttpTestingController],
        (service: GroupService,
          backend: HttpTestingController) => {
          service.isAuthorized(group.id)
            .subscribe(response => expect(response)
              .toBe(true));
          const req = backend.expectOne(fightAuthUrl);
          req.flush({ "isAuthorized": true });
        }));
  })
});

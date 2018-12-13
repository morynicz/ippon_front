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
  let service: GroupService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(GroupService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the groups api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the group to be created in body \
    returns newly added group",
      () => {
        service.add(group)
          .subscribe(response => expect(response).toBe(group));
        const req = backend.expectOne(groupUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(group);
        req.flush(group);
      });
  });

  describe("when delete is called", () => {
    it("calls the group api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(group)
          .subscribe();
        const req = backend.expectOne(groupUrl + group.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
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

    it("calls the groups api url, uses GET method, \
    sends request with application/json content type headers \
    and responds with requested teams",
      () => {
        service.getList(tournamentId)
          .subscribe(response => expect(response)
            .toBe(groups));
        const req = backend.expectOne(filteredUrl);
        req.flush(groups);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUPS_ENDPOINT + `${group.id}/`;
    it("calls the fights api url, uses GET method \
    and returns authorization",
      () => {
        service.isAuthorized(group.id)
          .subscribe(response => {
            expect(response).toBe(true)
          });
        const req = backend.expectOne(fightAuthUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type')).toBe(true);
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
      });
  });
});

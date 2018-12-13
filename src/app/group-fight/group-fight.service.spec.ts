import { TestBed, inject } from '@angular/core/testing';

import { GroupFightService } from './group-fight.service';
import { IPPON_HOST, GROUP_FIGHTS_ENDPOINT, TOURNAMENTS_ENDPOINT, GROUPS_ENDPOINT, AUTHORIZATION_ENDPOINT } from '../rest-api';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GroupFight } from './group-fight';

const teamFightId: number = 32;
const groupId: number = 1138;
const groupFight: GroupFight = {
  group: groupId,
  team_fight: teamFightId,
  id: 12
};

const groupFightUrl: string = IPPON_HOST + GROUP_FIGHTS_ENDPOINT;

describe('GroupFightService', () => {
  let service: GroupFightService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupFightService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(GroupFightService);
    backend = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the group fights api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the group fightto be created in body \
    returns newly added group fight",
      () => {
        service.add(groupFight)
          .subscribe(response => expect(response).toBe(groupFight));
        const req = backend.expectOne(groupFightUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(groupFight);
        req.flush(groupFight);
      });
  });

  describe("when delete is called", () => {
    it("calls the group fight api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(groupFight)
          .subscribe();
        const req = backend.expectOne(groupFightUrl + groupFight.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });


  describe("when getList is called", () => {
    let filteredUrl = IPPON_HOST + GROUPS_ENDPOINT + `${groupId}/` + GROUP_FIGHTS_ENDPOINT;
    let groupFights: GroupFight[] = [
      groupFight,
      {
        id: 2,
        group: groupId,
        team_fight: 894
      }];

    it("calls the groups fights api url, uses GET method, \
      sends request with application/json content type headers \
      and responds with requested group fights",
      () => {
        service.getList(groupId)
          .subscribe(response => expect(response)
            .toBe(groupFights));
        const req = backend.expectOne(filteredUrl);
        req.flush(groupFights);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUP_FIGHTS_ENDPOINT + `${groupFight.id}/`;
    it("calls the fights api url, uses GET method \
    and returns authorization",
      () => {
        service.isAuthorized(groupFight.id)
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

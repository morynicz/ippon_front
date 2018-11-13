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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupFightService],
      imports: [HttpClientTestingModule]
    });
  });

  describe("when add is called", () => {
    it("calls the team fights api url",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.add(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl);
        }));
    it("uses POST method",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.add(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.add(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added team fight",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.add(groupFight)
            .subscribe(response => expect(response).toBe(groupFight));
          const req = backend.expectOne(groupFightUrl);
          req.flush(groupFight);
        }));
    it("sends the team fight to be created in body",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.add(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl);
          expect(req.request.body).toBe(groupFight);
        }));
  });

  describe("when delete is called", () => {
    it("calls the team fight api url",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.delete(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl + groupFight.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.delete(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl + groupFight.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.delete(groupFight)
            .subscribe();
          const req = backend.expectOne(groupFightUrl + groupFight.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
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

    it("calls the resources api url",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(filteredUrl);
        }));
    it("uses GET method",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested teams",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.getList(groupId)
            .subscribe(response => expect(response)
              .toBe(groupFights));
          const req = backend.expectOne(filteredUrl);
          req.flush(groupFights);
        }));
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + GROUP_FIGHTS_ENDPOINT + `${groupFight.id}/`;
    it("calls the fights api url",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupFight.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
        }));
    it("uses isAuthorized method",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupFight.id).subscribe();
          const req = backend.expectOne(fightAuthUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("responds with requested fight",
      inject(
        [GroupFightService, HttpTestingController],
        (service: GroupFightService,
          backend: HttpTestingController) => {
          service.isAuthorized(groupFight.id)
            .subscribe(response => expect(response)
              .toBe(true));
          const req = backend.expectOne(fightAuthUrl);
          req.flush({ "isAuthorized": true });
        }));
  });
});

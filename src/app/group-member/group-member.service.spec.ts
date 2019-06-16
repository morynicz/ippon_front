import { TestBed, inject } from '@angular/core/testing';

import { GroupMemberService, MemberScore } from './group-member.service';
import { Team } from '../team/team';
import { IPPON_HOST, GROUPS_ENDPOINT, MEMBERS_ENDPOINT, NOT_ASSIGNED_ENDPOINT } from '../rest-api';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupMember } from './group-member';

const groupId: number = 687;
const tournamentId: number = 32;
const teams: Team[] = [
  {
    id: 22,
    name: "T1",
    members: [],
    tournament: tournamentId
  },
  {
    id: 27,
    name: "T2",
    members: [],
    tournament: tournamentId
  },
  {
    id: 27,
    name: "T2",
    members: [],
    tournament: tournamentId
  }
]

const memberId: number = 132;

const resourcesUrl: string = IPPON_HOST + GROUPS_ENDPOINT + `${groupId}/` + MEMBERS_ENDPOINT;
const resourceUrl: string = resourcesUrl + `${memberId}/`;

const resource: GroupMember = {
  'group': groupId,
  'team': memberId
}

describe('GroupMemberService', () => {
  let service: GroupMemberService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupMemberService]
    });
    service = TestBed.get(GroupMemberService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe("when add is called", () => {
    it("calls the resources api url, uses POST method, \
    sends request with application/json content type headers, \
    sends empty body and returns nothing",
      () => {
        service.add(resource).subscribe(
          response => expect(response).toEqual(null));
        const req = backend.expectOne(resourceUrl);
        req.flush(null);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toEqual(null);
      });
  });

  describe("when getList is called", () => {
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested resources",
      () => {
        service.getList(groupId)
          .subscribe(response => expect(response)
            .toBe(teams));
        const req = backend.expectOne(resourcesUrl);
        req.flush(teams);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getUnassigned is called", () => {
    const unassignedUrl: string = IPPON_HOST + GROUPS_ENDPOINT + `${groupId}/` + NOT_ASSIGNED_ENDPOINT;
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers \
    and requested resource",
      () => {
        service.getNotAssigned(groupId)
          .subscribe(response => expect(response)
            .toBe(teams));
        const req = backend.expectOne(unassignedUrl);
        req.flush(teams);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when delete is called", () => {
    it("calls the resources api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(resource).subscribe();
        const req = backend.expectOne(resourceUrl);
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      });
  });

  describe("when get_score is called", () => {
    it("calls resource api with get method and json content type and returns the score", () => {
      let expectedScore: MemberScore = { wins: 1, draws: 2, points: 3 };
      service.getScore(resource).subscribe((resp: MemberScore) => expect(resp).toEqual(expectedScore));
      const req = backend.expectOne(resourceUrl + 'score');
      expect(req.request.headers.has('Content-Type'))
        .toBe(true);
      expect(req.request.headers.get('Content-Type'))
        .toBe('application/json');
      expect(req.request.method).toBe('GET');
      req.flush(expectedScore);
    });
  });
});

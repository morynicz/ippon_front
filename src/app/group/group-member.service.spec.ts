import { TestBed, inject } from '@angular/core/testing';

import { GroupMemberService } from './group-member.service';
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GroupMemberService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe("when add is called", () => {
    it("calls the resources api url",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
        }));
    it("uses POST method",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("sends empty body",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.body).toEqual({});
          req.flush({});
        }));
  });

  describe("when getList is called", () => {
    it("calls the resources api url",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(resourcesUrl);
        }));
    it("uses GET method",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getList(groupId).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resources",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getList(groupId)
            .subscribe(response => expect(response)
              .toBe(teams));
          const req = backend.expectOne(resourcesUrl);
          req.flush(teams);
        }));
  });

  describe("when getUnassigned is called", () => {
    const unassignedUrl: string = IPPON_HOST + GROUPS_ENDPOINT + `${groupId}/` + NOT_ASSIGNED_ENDPOINT;
    it("calls the resources api url",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(groupId).subscribe();
          const req = backend.expectOne(unassignedUrl);
        }));
    it("uses GET method",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(groupId).subscribe();
          const req = backend.expectOne(unassignedUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(groupId).subscribe();
          const req = backend.expectOne(unassignedUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resources",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(groupId)
            .subscribe(response => expect(response)
              .toBe(teams));
          const req = backend.expectOne(unassignedUrl);
          req.flush(teams);
        }));
  });

  describe("when delete is called", () => {
    it("calls the resources api url",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
        }));
    it("uses DELETE method",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [GroupMemberService, HttpTestingController],
        (service: GroupMemberService,
          backend: HttpTestingController) => {
          service.delete(resource).subscribe();
          const req = backend.expectOne(resourceUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });
});

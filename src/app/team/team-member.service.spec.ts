import { TestBed, inject } from '@angular/core/testing';

import { TeamMemberService } from './team-member.service';
import { Player } from '../player/player';
import { Sex } from '../sex';
import { Rank } from '../rank';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IPPON_HOST, TEAMS_ENDPOINT, MEMBERS_ENDPOINT, NOT_ASSIGNED_ENDPOINT } from '../rest-api';
import { TeamMember } from './team-member';

const teamId: number = 14;

const players: Player[] = [{
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 0
},
{
  name: 'P2',
  surname: 'S2',
  sex: Sex.Female,
  birthday: new Date("2002-02-02"),
  rank: Rank.Kyu_2,
  club_id: 2,
  id: 1
}
]

const memberId: number = 17;

describe('TeamMemberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamMemberService]
    });
  });

  const resourcesUrl: string = IPPON_HOST + TEAMS_ENDPOINT + `${teamId}/` + MEMBERS_ENDPOINT;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamMemberService]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  describe("when add is called", () => {
    let resource: TeamMember = {
      'team': teamId,
      'player': memberId
    };
    it("calls the resources api url",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
        }));
    it("uses POST method",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added resource",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          req.flush(resource);
        }));
    it("sends the resource to be created in body",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.add(resource).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.body).toBe(resource);
          req.flush(resource);
        }));
  });

  describe("when getList is called", () => {
    it("calls the resources api url",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getList(teamId).subscribe();
          const req = backend.expectOne(resourcesUrl);
        }));
    it("uses GET method",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getList(teamId).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getList(teamId).subscribe();
          const req = backend.expectOne(resourcesUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resources",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getList(teamId)
            .subscribe(response => expect(response)
              .toBe(players));
          const req = backend.expectOne(resourcesUrl);
          req.flush(players);
        }));
  });

  describe("when getUnassigned is called", () => {
    const unassignedUrl: string = IPPON_HOST + TEAMS_ENDPOINT + `${teamId}/` + NOT_ASSIGNED_ENDPOINT;
    it("calls the resources api url",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(teamId).subscribe();
          const req = backend.expectOne(unassignedUrl);
        }));
    it("uses GET method",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(teamId).subscribe();
          const req = backend.expectOne(unassignedUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(teamId).subscribe();
          const req = backend.expectOne(unassignedUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested resources",
      inject(
        [TeamMemberService, HttpTestingController],
        (service: TeamMemberService,
          backend: HttpTestingController) => {
          service.getNotAssigned(teamId)
            .subscribe(response => expect(response)
              .toBe(players));
          const req = backend.expectOne(unassignedUrl);
          req.flush(players);
        }));
  });
});

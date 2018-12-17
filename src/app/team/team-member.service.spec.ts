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

const resource: TeamMember = {
  'team': teamId,
  'player': memberId
};

describe('TeamMemberService', () => {
  const resourcesUrl: string = IPPON_HOST + TEAMS_ENDPOINT + `${teamId}/` + MEMBERS_ENDPOINT;
  const resourceUrl: string = resourcesUrl + `${memberId}/`;

  let service: TeamMemberService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamMemberService]
    });
    service = TestBed.get(TeamMemberService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the resources api url, uses POST method, \
    sends request with application/json content type headers \
    and sends empty body",
      () => {
        service.add(resource).subscribe(
          resp => expect(resp).toEqual({}));
        const req = backend.expectOne(resourceUrl);
        expect(req.request.body).toEqual({});
        req.flush({});
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('POST');
      });
  });

  describe("when getList is called", () => {
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers, \
    and returns requested resources",
      () => {
        service.getList(teamId)
          .subscribe(response => expect(response)
            .toBe(players));
        const req = backend.expectOne(resourcesUrl);
        req.flush(players);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getUnassigned is called", () => {
    const unassignedUrl: string = IPPON_HOST + TEAMS_ENDPOINT + `${teamId}/` + NOT_ASSIGNED_ENDPOINT;
    it("calls the resources api url, uses GET method, \
    sends request with application/json content type headers, \
    and returns requested resources",
      () => {
        service.getNotAssigned(teamId)
          .subscribe(response => expect(response)
            .toBe(players));
        const req = backend.expectOne(unassignedUrl);
        req.flush(players);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when delete is called", () => {
    it("calls the resources api url, uses DELETE method, \
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
});

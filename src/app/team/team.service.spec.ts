import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamService } from './team.service';

import {
  IPPON_HOST,
  TEAMS_ENDPOINT,
  TOURNAMENTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { Player } from '../player/player';
import { Sex } from '../sex';
import { Rank } from '../rank';
import { Team } from './team';

const teamUrl: string = IPPON_HOST + TEAMS_ENDPOINT;

const tournamentId: number = 32;

const players: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 1
},
{
  name: 'P2',
  surname: 'S2',
  id: 2
}];

const team: Team = {
  id: 22,
  name: "T1",
  members: [players[0].id, players[1].id],
  tournament: tournamentId
}

describe('TeamService', () => {
  let service: TeamService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TeamService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the teams api url, uses POST method,\
    sends request with application/json content type headers, \
    sends the team to be created in body \
    and newly added team",
      () => {
        service.add(team)
          .subscribe(response => expect(response).toBe(team));
        const req = backend.expectOne(teamUrl);
        req.flush(team);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(team);
      });
  });

  describe("when delete is called", () => {
    it("calls the teams api url, uses DELETE method \
    and sends request with application/json content type headers",
      () => {
        service.delete(team)
          .subscribe();
        const req = backend.expectOne(teamUrl + team.id + '/');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      });
  });

  describe("when getList is called", () => {
    let tournamentId: number = 3;
    let filteredUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + TEAMS_ENDPOINT;
    let teams: Team[] = [
      team,
      {
        id: 22,
        name: "T2",
        members: [],
        tournament: tournamentId
      }];

    it("calls the teams api url, uses GET method, \
      sends request with application/json content type headers \
      and responds with requested teams",
      () => {
        service.getList(tournamentId)
          .subscribe(response => expect(response)
            .toBe(teams));
        const req = backend.expectOne(filteredUrl);
        req.flush(teams);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when update is called", () => {
    it("calls the teams api url, uses PUT method, \
    sends request with application/json content type headers \
    sends the team to be updated in body \
    and returns updated team",
      () => {
        service.update(team)
          .subscribe(response => expect(response)
            .toBe(team));
        const req = backend.expectOne(
          teamUrl + team.id + '/');
        req.flush(team);
        expect(req.request.body).toBe(team);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAMS_ENDPOINT + `${team.id}/`;
    it("calls the teams api url, uses GET method \
    and returns authorization",
      () => {
        service.isAuthorized(team.id)
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

import { TestBed, inject } from '@angular/core/testing';

import { TeamFightService } from './team-fight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  IPPON_HOST,
  TEAM_FIGHTS_ENDPOINT,
  TOURNAMENTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT
} from '../rest-api';
import { TeamFight } from './team-fight';
import { Player } from '../player/player';
import { Team } from '../team/team';
import { FightStatus } from '../fight-status';

const teamFightUrl: string = IPPON_HOST + TEAM_FIGHTS_ENDPOINT;

const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: 1,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId,
  shiro_score: 0,
  aka_score: 0,
  status: FightStatus.Prepared
}

const akaPlayers: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 1
},
{
  name: 'P3',
  surname: 'S3',
  id: 3
}];

const shiroPlayers: Player[] = [{
  name: 'P2',
  surname: 'S2',
  id: 2
},
{
  name: 'P4',
  surname: 'S4',
  id: 4
}];

const shiroTeam: Team = {
  id: 22,
  name: "T1",
  members: [shiroPlayers[0].id, shiroPlayers[1].id],
  tournament: tournamentId
}

const akaTeam: Team = {
  id: 23,
  name: "T2",
  members: [akaPlayers[0].id, akaPlayers[1].id],
  tournament: tournamentId
}

describe('TeamFightService', () => {
  let service: TeamFightService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamFightService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TeamFightService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the team fights api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the team fight to be created in body \
    returns newly added team fight",
      () => {
        service.add(teamFight)
          .subscribe(response => expect(response).toBe(teamFight));
        const req = backend.expectOne(teamFightUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(teamFight);
        req.flush(teamFight);
      });
  });

  describe("when delete is called", () => {
    it("calls the team fight api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(teamFight)
          .subscribe();
        const req = backend.expectOne(teamFightUrl + teamFight.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });


  describe("when getList is called", () => {
    let tournamentId: number = 3;
    let filteredUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + TEAM_FIGHTS_ENDPOINT;
    let teamFights: TeamFight[] = [
      teamFight,
      {
        id: 2,
        aka_team: 24,
        shiro_team: 25,
        tournament: tournamentId,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared
      }];

    it("calls the team fights api url, uses GET method, \
        sends request with application/json content type headers \
        and responds with requested team fights",
      () => {
        service.getList(tournamentId)
          .subscribe(response => expect(response)
            .toBe(teamFights));
        const req = backend.expectOne(filteredUrl);
        req.flush(teamFights);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when update is called", () => {
    it("calls the team fights api url, uses PUT method, \
    sends request with application/json content type headers \
    sends the team fight to be updated in body \
    and returns updated team fight",
      () => {
        service.update(teamFight)
          .subscribe(response => expect(response)
            .toBe(teamFight));
        const req = backend.expectOne(
          teamFightUrl + teamFight.id + '/');
        req.flush(teamFight);
        expect(req.request.body).toBe(teamFight);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let authUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + TEAM_FIGHTS_ENDPOINT + `${teamFight.id}/`;
    it("calls the team fights api url, uses GET method \
    and returns authorization",
      () => {
        service.isAuthorized(teamFight.id)
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

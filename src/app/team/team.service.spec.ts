import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamService } from './team.service';

import {
  IPPON_HOST,
  TEAMS_ENDPOINT,
  TOURNAMENTS_ENDPOINT
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
  sex: Sex.Female,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_1,
  club_id: 1,
  id: 1
},
{
  name: 'P2',
  surname: 'S2',
  sex: Sex.Male,
  birthday: new Date("2002-02-02"),
  rank: Rank.Dan_1,
  club_id: 2,
  id: 2
}];

const team: Team = {
  id: 22,
  name: "T1",
  members: [players[0].id, players[1].id],
  tournament: tournamentId
}

describe('TeamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamService],
      imports: [HttpClientTestingModule]
    });
  });

  describe("when add is called", () => {
    it("calls the teams api url",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.add(team)
            .subscribe();
        }));
    it("uses POST method",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.add(team)
            .subscribe();
          const req = backend.expectOne(teamUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.add(team)
            .subscribe();
          const req = backend.expectOne(teamUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added team",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.add(team)
            .subscribe(response => expect(response).toBe(team));
          const req = backend.expectOne(teamUrl);
          req.flush(team);
        }));
    it("sends the team to be created in body",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.add(team)
            .subscribe();
          const req = backend.expectOne(teamUrl);
          expect(req.request.body).toBe(team);
        }));
  });

  describe("when delete is called", () => {
    it("calls the tournaments api url",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.delete(team)
            .subscribe();
        }));
    it("uses DELETE method",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.delete(team)
            .subscribe();
          const req = backend.expectOne(teamUrl + team.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.delete(team)
            .subscribe();
          const req = backend.expectOne(teamUrl + team.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
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

    it("calls the resources api url",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
        }));
    it("uses GET method",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamService, HttpTestingController],
        (service: TeamService,
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
        [TeamService, HttpTestingController],
        (service: TeamService,
          backend: HttpTestingController) => {
          service.getList(tournamentId)
            .subscribe(response => expect(response)
              .toBe(teams));
          const req = backend.expectOne(filteredUrl);
          req.flush(teams);
        }));
  });
});

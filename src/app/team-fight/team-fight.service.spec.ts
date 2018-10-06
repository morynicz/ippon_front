import { TestBed, inject } from '@angular/core/testing';

import { TeamFightService } from './team-fight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { 
  IPPON_HOST,
  TEAM_FIGHTS_ENDPOINT,
  TOURNAMENTS_ENDPOINT
} from '../rest-api';
import { TeamFight } from './team-fight';
import { Player } from '../player/player';
import { Sex } from '../sex';
import { Rank } from '../rank';
import { Team } from '../team/team';

const teamFightUrl: string = IPPON_HOST + TEAM_FIGHTS_ENDPOINT;

const akaTeamId: number = 15;
const shiroTeamId: number = 74;
const tournamentId: number = 32;

const teamFight: TeamFight = {
  id: 1,
  aka_team: akaTeamId,
  shiro_team: shiroTeamId,
  tournament: tournamentId
}

const akaPlayers: Player[] = [{
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 1
},
{
  name: 'P3',
  surname: 'S3',
  sex: Sex.Male,
  birthday: new Date("2003-03-03"),
  rank: Rank.Kyu_3,
  club_id: 0,
  id: 3
}];

const shiroPlayers: Player[] = [{
  name: 'P2',
  surname: 'S2',
  sex: Sex.Female,
  birthday: new Date("2002-02-02"),
  rank: Rank.Kyu_2,
  club_id: 2,
  id: 2
},
{
  name: 'P4',
  surname: 'S4',
  sex: Sex.Female,
  birthday: new Date("2004-04-04"),
  rank: Rank.Kyu_4,
  club_id: 4,
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamFightService],
      imports: [HttpClientTestingModule]
    });
  });

  describe("when add is called", () => {
    it("calls the team fights api url",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.add(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl);
        }));
    it("uses POST method",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.add(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.add(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added team fight",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.add(teamFight)
            .subscribe(response => expect(response).toBe(teamFight));
          const req = backend.expectOne(teamFightUrl);
          req.flush(teamFight);
        }));
    it("sends the team fight to be created in body",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.add(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl);
          expect(req.request.body).toBe(teamFight);
        }));
  });

  describe("when delete is called", () => {
    it("calls the team fight api url",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.delete(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl + teamFight.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.delete(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl + teamFight.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.delete(teamFight)
            .subscribe();
          const req = backend.expectOne(teamFightUrl + teamFight.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
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
        tournament: tournamentId
      }];

    it("calls the resources api url",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
        }));
    it("uses GET method",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.getList(tournamentId).subscribe();
          const req = backend.expectOne(filteredUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
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
        [TeamFightService, HttpTestingController],
        (service: TeamFightService,
          backend: HttpTestingController) => {
          service.getList(tournamentId)
            .subscribe(response => expect(response)
              .toBe(teamFights));
          const req = backend.expectOne(filteredUrl);
          req.flush(teamFights);
        }));
  });
});

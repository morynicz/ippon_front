import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TournamentService } from './tournament.service';
import { Tournament } from './tournament';
import { NumericConstraint } from './numeric-constraint';
import { SexConstraint } from './sex-constraint';

import { Rank } from '../rank';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  AUTHORIZATION_ENDPOINT,
  TOURNAMENT_ADMINS_ENDPOINT,
  ADMINS_ENDPOINT,
  STAFF_ENDPOINT
} from '../rest-api';

const tournamentsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT;

const tournament: Tournament = {
  id: 0,
  name: "T1",
  date: new Date("2020-01-01"),
  city: "Ci1",
  address: "A1",
  team_size: 3,
  group_match_length: 3,
  ko_match_length: 4,
  final_match_length: 5,
  finals_depth: 2,
  age_constraint: NumericConstraint.None,
  age_constraint_value: 0,
  rank_constraint: NumericConstraint.None,
  rank_constraint_value: Rank.Kyu_5,
  sex_constraint: SexConstraint.None,
  description: "d1",
  webpage: "w1"
};

const tournaments: Tournament[] = [
  tournament,
  {
    id: 2,
    name: "T2",
    date: new Date("2022-02-02"),
    city: "Ci2",
    address: "A2",
    team_size: 4,
    group_match_length: 6,
    ko_match_length: 1,
    final_match_length: 12,
    finals_depth: 4,
    age_constraint: NumericConstraint.Less,
    age_constraint_value: 20,
    rank_constraint: NumericConstraint.Greater,
    rank_constraint_value: Rank.Dan_1,
    sex_constraint: SexConstraint.WomenOnly,
    description: "d2",
    webpage: "w2"
  }
];


describe('TournamentService', () => {
  const tournamentUrl: string = tournamentsUrl + `${tournament.id}/`;

  let service: TournamentService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TournamentService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when add is called", () => {
    it("calls the tournaments api url, \
    uses POST method, \
    sends request with application/json content type headers\
    sends the tournament to be created in body \
    returns newly added tournament",
      () => {
        service.add(tournament)
          .subscribe(response => expect(response).toBe(tournament));
        const req = backend.expectOne(tournamentsUrl);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(tournament);
        req.flush(tournament);
      });
  });

  describe("when get is called", () => {
    it("calls the tournaments api url, uses GET method, \
    ",
      () => {
        service.get(tournament.id)
          .subscribe(response => expect(response)
            .toBe(tournament));
        const req = backend.expectOne(tournamentUrl);
        req.flush(tournament);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when update is called", () => {
    it("calls the tournaments api url, uses PUT method, \
    sends request with application/json content type headers \
    sends the tournament to be updated in body \
    and returns updated tournament",
      () => {
        service.update(tournament)
          .subscribe(response => expect(response)
            .toBe(tournament));
        const req = backend.expectOne(
          tournamentUrl);
        req.flush(tournament);
        expect(req.request.body).toBe(tournament);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when delete is called", () => {
    it("calls the tournament api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.delete(tournament)
          .subscribe();
        const req = backend.expectOne(tournamentUrl);
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when isAuthorized is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + TOURNAMENTS_ENDPOINT + ADMINS_ENDPOINT + `${tournament.id}/`;
    it("calls the fights api url and returns requested authorization",
      () => {
        service.isAuthorized(tournament.id)
          .subscribe(response => expect(response)
            .toBe(true));
        const req = backend.expectOne(fightAuthUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
      });
  });

  describe("when isStaff is called", () => {
    let fightAuthUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT + TOURNAMENTS_ENDPOINT + STAFF_ENDPOINT + `${tournament.id}/`;
    it("calls the fights api url and returns requested authorization",
      () => {
        service.isStaff(tournament.id)
          .subscribe(response => expect(response)
            .toBe(true));
        const req = backend.expectOne(fightAuthUrl);
        req.flush({ "isAuthorized": true });
        expect(req.request.method).toBe('GET');
      });
  });

});

import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentService } from './tournament.service';
import { Tournament } from './tournament';
import { NumericConstraint } from './numeric-constraint';
import { SexConstraint } from './sex-constraint';

import { Rank } from '../rank';
import { User } from '../user';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created',
    inject([TournamentService], (service: TournamentService) => {
      expect(service).toBeTruthy();
    }));

  describe("when add is called", () => {
    let expected: Tournament = tournament;
    it("calls the tournaments api url",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.add(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
        }));
    it("uses POST method",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.add(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.add(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added tournament",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.add(tournament)
            .subscribe(response => expect(response).toBe(expected));
          const req = backend.expectOne(tournamentsUrl);
          req.flush(expected);
        }));
    it("sends the tournament to be created in body",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.add(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
          expect(req.request.body).toBe(tournament);
          req.flush(expected);
        }));
  });

  describe("when getList is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.getList()
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
        }));
    it("uses GET method",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.getList()
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.getList()
            .subscribe();
          const req = backend.expectOne(tournamentsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested tournaments",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.getList()
            .subscribe(response => expect(response)
              .toBe(tournaments));
          const req = backend.expectOne(tournamentsUrl);
          req.flush(tournaments);
        }));
  });

  describe("when get is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.get(tournament.id)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
        }));
    it("uses GET method",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.get(tournament.id)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.get(tournament.id)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested tournament",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.get(tournament.id)
            .subscribe(response => expect(response)
              .toBe(tournament));
          const req = backend.expectOne(tournamentUrl);
          req.flush(tournament);
        }));
  });

  describe("when update is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.update(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
        }));
    it("uses PUT method",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.update(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.method).toBe('PUT');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.update(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with updated tournament",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.update(tournament)
            .subscribe(response => expect(response)
              .toBe(tournament));
          const req = backend.expectOne(
            tournamentsUrl + `${tournament.id}/`);
          req.flush(tournament);
        }));
  });

  describe("when delete is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.delete(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
        }));
    it("uses DELETE method",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.delete(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentService, HttpTestingController],
        (service: TournamentService,
          backend: HttpTestingController) => {
          service.delete(tournament)
            .subscribe();
          const req = backend.expectOne(tournamentUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });
});

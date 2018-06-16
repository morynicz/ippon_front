import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentParticipantService } from './tournament-participant.service';
import { Tournament } from './tournament';
import { Player } from '../player/player';
import { Rank } from '../rank';
import { Sex } from '../sex';
import { TournamentParticipation } from './tournament-participation';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  NON_PARTICIPANTS_ENDPOINT,
  PARTICIPATIONS_ENDPOINT
} from '../rest-api';

const tournamentId: number = 7;
const participationsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + PARTICIPATIONS_ENDPOINT;
const participationUrl = IPPON_HOST + PARTICIPATIONS_ENDPOINT;
const nonParticipantsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + NON_PARTICIPANTS_ENDPOINT;

const participation: TournamentParticipation = {
  id: 3,
  tournament_id: tournamentId,
  player: {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 1,
    id: 1
  },
  is_paid: true,
  is_registered: false,
  is_sex_ok: true,
  is_age_ok: false,
  is_rank_ok: true,
  is_qualified: false,
  notes: "N1"
}

const nonParticipants: Player[] = [
  {
    name: 'P3',
    surname: 'S3',
    sex: Sex.Female,
    birthday: new Date("2003-03-03"),
    rank: Rank.Dan_3,
    club_id: 3,
    id: 3
  },
  {
    name: 'P4',
    surname: 'S4',
    sex: Sex.Male,
    birthday: new Date("2004-04-04"),
    rank: Rank.Kyu_2,
    club_id: 4,
    id: 4
  }
];

const participations: TournamentParticipation[] = [
  participation,
  {
    id: 4,
    tournament_id: tournamentId,
    player: {
      name: 'P2',
      surname: 'S2',
      sex: Sex.Female,
      birthday: new Date("2002-02-02"),
      rank: Rank.Kyu_4,
      club_id: 2,
      id: 2
    },
    is_paid: false,
    is_registered: true,
    is_sex_ok: false,
    is_age_ok: true,
    is_rank_ok: false,
    is_qualified: false,
    notes: "N2"
  }
]

describe('TournamentParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentParticipantService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TournamentParticipantService], (service: TournamentParticipantService) => {
    expect(service).toBeTruthy();
  }));

  describe("when addParticipation is called", () => {
    let expected: TournamentParticipation = participation;
    it("calls the tournaments api url",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.addParticipation(tournamentId, participation)
            .subscribe();
          const req = backend.expectOne(participationUrl);
        }));
    it("uses POST method",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.addParticipation(tournamentId, participation)
            .subscribe();
          const req = backend.expectOne(participationUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.addParticipation(tournamentId, participation)
            .subscribe();
          const req = backend.expectOne(participationUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added participation",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.addParticipation(tournamentId, participation)
            .subscribe();
          const req = backend.expectOne(participationUrl);
          req.flush(expected);
        }));
    it("sends the participation to be created in body",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.addParticipation(tournamentId, participation)
            .subscribe();
          const req = backend.expectOne(participationUrl);
          expect(req.request.body).toBe(participation);
          req.flush(expected);
        }));
  });

  describe("when getParticipations is called", () => {
    it("calls the participations api url",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getParticipations(tournamentId)
            .subscribe();
          const req = backend.expectOne(participationsUrl);
        }));
    it("uses GET method",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getParticipations(tournamentId)
            .subscribe();
          const req = backend.expectOne(participationsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getParticipations(tournamentId)
            .subscribe();
          const req = backend.expectOne(participationsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested participants",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getParticipations(tournamentId)
            .subscribe();
          const req = backend.expectOne(participationsUrl);
          req.flush(participations);
        }));
  });

  describe("when updateParticipation is called", () => {
    it("calls the participations api url",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.updateParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
        }));
    it("uses PUT method",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.updateParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
          expect(req.request.method).toBe('PUT');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.updateParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with updated participation",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.updateParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
          req.flush(participation);
        }));
  });

  describe("when deleteParticipation is called", () => {
    it("calls the participations api url",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.deleteParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
        }));
    it("uses DELETE method",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.deleteParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.deleteParticipation(participation)
            .subscribe();
          const req = backend.expectOne(participationUrl + `${participation.id}/`);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });

  describe("when getNonParticipants is called", () => {
    it("calls the participations api url",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getNonParticipants(tournamentId)
            .subscribe();
          const req = backend.expectOne(nonParticipantsUrl);
        }));
    it("uses GET method",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getNonParticipants(tournamentId)
            .subscribe();
          const req = backend.expectOne(nonParticipantsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getNonParticipants(tournamentId)
            .subscribe();
          const req = backend.expectOne(nonParticipantsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested non participants",
      inject(
        [TournamentParticipantService, HttpTestingController],
        (service: TournamentParticipantService,
          backend: HttpTestingController) => {
          service.getNonParticipants(tournamentId)
            .subscribe();
          const req = backend.expectOne(nonParticipantsUrl);
          req.flush(nonParticipants);
        }));
  });
});

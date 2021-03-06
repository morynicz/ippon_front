import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TournamentParticipantService } from './tournament-participant.service';
import { Player } from '../player/player';
import { Rank } from '../rank';
import { Sex } from '../sex';
import { TournamentParticipation } from './tournament-participation';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  NON_PARTICIPANTS_ENDPOINT,
  PARTICIPATIONS_ENDPOINT,
  NOT_ASSIGNED_ENDPOINT
} from '../rest-api';

const tournamentId: number = 7;
const participationsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + PARTICIPATIONS_ENDPOINT;
const participationUrl = IPPON_HOST + PARTICIPATIONS_ENDPOINT;
const nonParticipantsUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + NON_PARTICIPANTS_ENDPOINT;
const notAssignedUrl = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + NOT_ASSIGNED_ENDPOINT;

const participation: TournamentParticipation = {
  id: 3,
  tournament_id: tournamentId,
  player: {
    name: 'P1',
    surname: 'S1',
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
    id: 3
  },
  {
    name: 'P4',
    surname: 'S4',
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

const notAssigned: Player[] = [
  {
    id: 34,
    name: "n34",
    surname: "s34"
  },
  {
    id: 72,
    name: "n72",
    surname: "s72"
  }
]

describe('TournamentParticipantService', () => {
  let service: TournamentParticipantService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentParticipantService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TournamentParticipantService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when addParticipation is called", () => {
    let expected: TournamentParticipation = participation;
    it("calls the tournament participations api url, \
    uses POST method, sends the participation to be created in body, \
    sends request with application/json content type headers \
    and returns newly added participation",
      () => {
        service.addParticipation(tournamentId, participation)
          .subscribe(response => expect(response).toBe(expected));
        const req = backend.expectOne(participationUrl);
        expect(req.request.body).toBe(participation);
        req.flush(expected);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getParticipations is called", () => {
    it("calls the participations api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested participants",
      () => {
        service.getParticipations(tournamentId)
          .subscribe(response => expect(response).toBe(participations));
        const req = backend.expectOne(participationsUrl);
        req.flush(participations);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when updateParticipation is called", () => {
    it("calls the participations api url, uses PUT method, \
    sends request with application/json content type headers, \
    sends the updated participation in request body \
    and returns updatedParticipation",
      () => {
        service.updateParticipation(participation)
          .subscribe();
        const req = backend.expectOne(participationUrl + `${participation.id}/`);
        req.flush(participation);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(participation);
      });
  });

  describe("when deleteParticipation is called", () => {
    it("calls the participations api url, uses DELETE method, \
    and sends request with application/json content type headers",
      () => {
        service.deleteParticipation(participation)
          .subscribe();
        const req = backend.expectOne(participationUrl + `${participation.id}/`);
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getNonParticipants is called", () => {
    it("calls the participations api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested non participants",
      () => {
        service.getNonParticipants(tournamentId)
          .subscribe(response => expect(response).toBe(nonParticipants));
        const req = backend.expectOne(nonParticipantsUrl);
        req.flush(nonParticipants);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getNotAssigned is called", () => {
    it("calls the participations api url, uses GET method, \
    sends request with application/json content type headers \
    and returns requested non participants",
      () => {
        service.getNotAssigned(tournamentId)
          .subscribe(response => expect(response).toBe(notAssigned));
        const req = backend.expectOne(notAssignedUrl);
        req.flush(notAssigned);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

});

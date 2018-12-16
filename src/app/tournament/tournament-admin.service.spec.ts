import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentAdminService } from './tournament-admin.service';
import { Tournament } from './tournament';

import { User } from '../user';
import { TournamentAdmin } from './tournament-admin';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT,
  TOURNAMENT_ADMINS_ENDPOINT,
  NON_ADMINS_ENDPOINT
} from '../rest-api';

const tournamentId: number = 7;

describe('TournamentAdminService', () => {
  let service: TournamentAdminService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentAdminService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(TournamentAdminService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  const adminsUrl: string = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + ADMINS_ENDPOINT;
  const nonAdminsUrl: string = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + NON_ADMINS_ENDPOINT;
  const adminUrl: string = IPPON_HOST + TOURNAMENT_ADMINS_ENDPOINT;
  let admins: TournamentAdmin[] = [
    {
      tournament_id: tournamentId,
      user: {
        id: 1,
        username: 'N1',
      },
      is_master: true,
      id: 1
    },
    {
      tournament_id: tournamentId,
      id: 2,
      user: {
        id: 2,
        username: 'N2'
      },
      is_master: false
    }
  ];

  let admin: TournamentAdmin = {
    id: 3,
    user: {
      id: 5,
      username: 'U5'
    },
    tournament_id: tournamentId,
    is_master: true
  };

  let users: User[] = [
    {
      id: 9,
      username: 'U9'
    },
    {
      id: 7,
      username: 'U7'
    }
  ];

  describe("when getAdmins is called", () => {
    it("calls the tournament admin api url, uses GET method, \
    sends request with application/json content type headers and \
    responds with requested admins",
      () => {
        service.getAdmins(tournamentId)
          .subscribe(response => expect(response)
            .toBe(admins));
        const req = backend.expectOne(adminsUrl);
        req.flush(admins);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when addAdmin is called", () => {
    it("calls the tournament admin api url, uses POST method, \
    sends request with application/json content type headers, \
    sends the admin to be created in body and \
    returns the newly added admin",
      () => {
        service.addAdmin(admin)
          .subscribe(response => expect(response).toBe(admin));
        const req = backend.expectOne(adminUrl);
        req.flush(admin);
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(admin);
      });
  });

  describe("when updateAdmin is called", () => {
    it("calls the admins api url, uses PUT method, \
    sends request with application/json content type headers, \
    sends the updated admin in request body and \
    returns updated admin",
      () => {
        service.updateAdmin(admin)
          .subscribe();
        const req = backend.expectOne(adminUrl + `${admin.id}/`);
        req.flush(admin);
        expect(req.request.method).toBe('PUT');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toBe(admin);
      });
  });

  describe("when deleteAdmin is called", () => {
    let admin: User = { id: 5, username: 'A5' };
    it("calls the admins api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.deleteAdmin(admin.id)
          .subscribe();
        const req = backend.expectOne(adminUrl + admin.id + '/');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.method).toBe('DELETE');
      });
  });

  describe("when getNonAdmins is called", () => {
    it("calls the admins api url, uses GET method, \
    sends request with application/json content type headers \
    and returns non admins",
      () => {
        service.getNonAdmins(tournamentId)
          .subscribe(response => expect(response).toBe(users));
        const req = backend.expectOne(nonAdminsUrl);
        req.flush(users);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });
});

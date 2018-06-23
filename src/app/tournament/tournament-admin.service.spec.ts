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
  TOURNAMENT_ADMINS_ENDPOINT
} from '../rest-api';

const tournamentId: number = 7;

describe('TournamentAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TournamentAdminService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created',
    inject([TournamentAdminService],
      (service: TournamentAdminService) => {
        expect(service).toBeTruthy();
      }));

  const adminsUrl: string = IPPON_HOST + TOURNAMENTS_ENDPOINT + `${tournamentId}/` + ADMINS_ENDPOINT;
  const adminUrl: string = IPPON_HOST + TOURNAMENT_ADMINS_ENDPOINT;
  let admins: TournamentAdmin[] = [
    {
      tournament_id: tournamentId,
      user: {
        id: 1,
        name: 'N1',
      },
      is_master: true,
      id: 1
    },
    {
      tournament_id: tournamentId,
      id: 2,
      user: {
        id: 2,
        name: 'N2'
      },
      is_master: false
    }
  ];

  let admin: TournamentAdmin = {
    id: 3,
    user: {
      id: 5,
      name: 'U5'
    },
    tournament_id: tournamentId,
    is_master: true
  };

  describe("when getAdmins is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(tournamentId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
        }));
    it("uses GET method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(tournamentId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(tournamentId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested tournament",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(tournamentId)
            .subscribe(response => expect(response)
              .toBe(admins));
          const req = backend.expectOne(adminsUrl);
          req.flush(admins);
        }));
  });

  describe("when addAdmin is called", () => {
    it("calls the tournaments api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
        }));
    it("uses POST method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added admin",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe(response => expect(response).toBe(admin));
          const req = backend.expectOne(adminUrl);
          req.flush(admin);
        }));
    it("sends the admin to be created in body",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
          expect(req.request.body).toBe(admin);
        }));
  });

  describe("when updateAdmin is called", () => {
    it("calls the participations api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.updateAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl + `${admin.id}/`);
        }));
    it("uses PUT method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.updateAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl + `${admin.id}/`);
          expect(req.request.method).toBe('PUT');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.updateAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl + `${admin.id}/`);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with updated admin",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.updateAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl + `${admin.id}/`);
          req.flush(admin);
        }));
  });

  describe("when deleteAdmin is called", () => {
    let admin: User = { id: 5, name: 'A5' };
    it("calls the tournaments api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(admin.id)
            .subscribe();
          const req = backend.expectOne(adminUrl + admin.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(admin.id)
            .subscribe();
          const req = backend.expectOne(adminUrl + admin.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(admin.id)
            .subscribe();
          const req = backend.expectOne(adminUrl + admin.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });
});

import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentAdminService } from './tournament-admin.service';
import { Tournament } from './tournament';

import { User } from '../user';

import {
  IPPON_HOST,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT
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
  let admins: User[] = [
    {
      id: 1,
      name: 'N1'
    },
    {
      id: 2,
      name: 'N2'
    }
  ];
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
    let admin: User = { id: 5, name: 'A5' };
    it("calls the tournaments api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(tournamentId, admin)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
        }));
    it("uses POST method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(tournamentId, admin)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.method).toBe('POST');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(tournamentId, admin)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with newly added tournament",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(tournamentId, admin)
            .subscribe(response => expect(response).toBe(admin));
          const req = backend.expectOne(adminsUrl);
          req.flush(admin);
        }));
    it("sends the admin to be created in body",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(tournamentId, admin)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.body).toBe(admin);
        }));
  });

  describe("when deleteAdmin is called", () => {
    let admin: User = { id: 5, name: 'A5' };
    it("calls the tournaments api url",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(tournamentId, admin.id)
            .subscribe();
          const req = backend.expectOne(adminsUrl + admin.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(tournamentId, admin.id)
            .subscribe();
          const req = backend.expectOne(adminsUrl + admin.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [TournamentAdminService, HttpTestingController],
        (service: TournamentAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(tournamentId, admin.id)
            .subscribe();
          const req = backend.expectOne(adminsUrl + admin.id + '/');
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
  });
});

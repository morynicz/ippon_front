import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubAdminService } from './club-admin.service';
import { ClubAdmin } from './club-admin';

import { User } from '../user';

import {
  IPPON_HOST,
  CLUBS_ENDPOINT,
  ADMINS_ENDPOINT,
  CLUB_ADMINS_ENDPOINT,
  NON_ADMINS_ENDPOINT
} from '../rest-api';

const clubId: number = 9;

describe('ClubAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClubAdminService]
    });
  });

  const adminsUrl: string = IPPON_HOST + CLUBS_ENDPOINT + `${clubId}/` + ADMINS_ENDPOINT;
  const nonAdminsUrl: string = IPPON_HOST + CLUBS_ENDPOINT + `${clubId}/` + NON_ADMINS_ENDPOINT;
  const adminUrl: string = IPPON_HOST + CLUB_ADMINS_ENDPOINT;
  let admins: ClubAdmin[] = [
    {
      id: 1,
      username: 'N1',
    },
    {
      id: 2,
      username: 'N2'
    }
  ];

  let admin: ClubAdmin = {
    id: 5,
    username: 'U5'
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
    it("calls the clubs api url",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
        }));
    it("uses GET method",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(adminsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested club admins",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getAdmins(clubId)
            .subscribe(response => expect(response)
              .toBe(admins));
          const req = backend.expectOne(adminsUrl);
          req.flush(admins);
        }));
  });

  describe("when addAdmin is called", () => {
    it("calls the clubs api url",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
        }));
    it("uses POST method",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
          expect(req.request.method).toBe('POST');
        }));

    it("sends request with application/json content type headers",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
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
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe(response => expect(response).toBe(admin));
          const req = backend.expectOne(adminUrl);
          req.flush(admin);
        }));

    it("sends the admin to be created in body",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.addAdmin(admin)
            .subscribe();
          const req = backend.expectOne(adminUrl);
          expect(req.request.body).toBe(admin);
        }));
  });

  describe("when deleteAdmin is called", () => {
    let admin: User = { id: 5, username: 'A5' };
    it("calls the clubs api url",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(admin.id)
            .subscribe();
          const req = backend.expectOne(adminUrl + admin.id + '/');
        }));
    it("uses DELETE method",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.deleteAdmin(admin.id)
            .subscribe();
          const req = backend.expectOne(adminUrl + admin.id + '/');
          expect(req.request.method).toBe('DELETE');
        }));
    it("sends request with application/json content type headers",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
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

  describe("when getNonAdmins is called", () => {
    it("calls the participations api url",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getNonAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(nonAdminsUrl);
        }));
    it("uses GET method",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getNonAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(nonAdminsUrl);
          expect(req.request.method).toBe('GET');
        }));
    it("sends request with application/json content type headers",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getNonAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(nonAdminsUrl);
          expect(req.request.headers.has('Content-Type'))
            .toBe(true);
          expect(req.request.headers.get('Content-Type'))
            .toBe('application/json');
        }));
    it("responds with requested non participants",
      inject(
        [ClubAdminService, HttpTestingController],
        (service: ClubAdminService,
          backend: HttpTestingController) => {
          service.getNonAdmins(clubId)
            .subscribe();
          const req = backend.expectOne(nonAdminsUrl);
          req.flush(users);
        }));
  });

  it('should be created', inject([ClubAdminService], (service: ClubAdminService) => {
    expect(service).toBeTruthy();
  }));
});

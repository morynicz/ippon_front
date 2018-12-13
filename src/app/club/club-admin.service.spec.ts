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
  let service: ClubAdminService;
  let backend: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClubAdminService]
    });
    service = TestBed.get(ClubAdminService);
    backend = TestBed.get(HttpTestingController);
  });

  const adminsUrl: string = IPPON_HOST + CLUBS_ENDPOINT + `${clubId}/` + ADMINS_ENDPOINT;
  const nonAdminsUrl: string = IPPON_HOST + CLUBS_ENDPOINT + `${clubId}/` + NON_ADMINS_ENDPOINT;
  const adminUrl: string = IPPON_HOST + CLUB_ADMINS_ENDPOINT;
  let admins: ClubAdmin[] = [
    {
      id: 1,
      club_id: clubId,
      user: {

        id: 1,
        username: 'N1',
      }
    },
    {
      id: 1,
      club_id: clubId,
      user: {
        id: 2,
        username: 'N2'
      }
    }
  ];

  let admin: ClubAdmin = {
    id: 5,
    club_id: clubId,
    user: {
      id: 5,
      username: 'U5'
    }
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
    it("calls the clubs api url with get method, \
     application/json content type headers \
     and returns requested clubs",
      () => {
        service.getAdmins(clubId)
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
    it("calls the clubs api url, uses POST method, \
    sends request with application/json content type headers, \
    sends the admin to be created in body \
    and responds with newly added admin",
      () => {
        service.addAdmin(admin)
          .subscribe(response => expect(response).toBe(admin));
        const req = backend.expectOne(adminUrl);
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        req.flush(admin);
        expect(req.request.body).toBe(admin);
      });
  });

  describe("when deleteAdmin is called", () => {
    let admin: User = { id: 5, username: 'A5' };
    it("calls the clubs api url, uses DELETE method and \
    sends request with application/json content type headers",
      () => {
        service.deleteAdmin(admin.id)
          .subscribe();
        const req = backend.expectOne(adminUrl + admin.id + '/');
        expect(req.request.method).toBe('DELETE');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
      });
  });

  describe("when getNonAdmins is called", () => {
    it("calls the admins api url, uses GET method, \
    with application/json content type headers and \
    returns  requested non admins",
      () => {
        service.getNonAdmins(clubId)
          .subscribe(response => expect(response).toBe(users));
        const req = backend.expectOne(nonAdminsUrl);
        expect(req.request.method).toBe('GET');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        req.flush(users);
      });
  });
});

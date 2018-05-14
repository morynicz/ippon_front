import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AuthorizationService, Authorization } from './authorization.service';
import {
  IPPON_HOST,
  AUTHORIZATION_ENDPOINT,
  CLUBS_ENDPOINT,
  TOURNAMENTS_ENDPOINT,
  ADMINS_ENDPOINT,
  STAFF_ENDPOINT
} from '../rest-api';

const authorizationUrl = IPPON_HOST + AUTHORIZATION_ENDPOINT;

describe('AuthorizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should be created', inject([AuthorizationService], (service: AuthorizationService) => {
    expect(service).toBeTruthy();
  }));

  it('should query clubAdmin API when isClubAdmin is called', async(inject([AuthorizationService, HttpTestingController], (service: AuthorizationService, backend: HttpTestingController) => {
    let clubId: number = 42;
    service.isClubAdmin(clubId).subscribe(result => {
      expect(result).toEqual(true);
    });

    backend.expectOne({
      url: authorizationUrl + CLUBS_ENDPOINT + clubId,
      method: 'GET'
    }).flush({ isAuthorized: true });
  })));

  it('should query tournamentAdmin API when isTournamentAdmin is called', async(inject([AuthorizationService, HttpTestingController], (service: AuthorizationService, backend: HttpTestingController) => {
    let tournamentId: number = 11;
    service.isTournamentAdmin(tournamentId).subscribe(result => {
      expect(result).toEqual(false);
    });

    backend.expectOne({
      url: authorizationUrl + TOURNAMENTS_ENDPOINT + ADMINS_ENDPOINT + tournamentId,
      method: 'GET'
    }).flush({ isAuthorized: false });
  })));

  it('should query tournamentStaff API when isTournamentStaff is called', async(inject([AuthorizationService, HttpTestingController], (service: AuthorizationService, backend: HttpTestingController) => {
    let tournamentId: number = 11;
    service.isTournamentStaff(tournamentId).subscribe(result => {
      expect(result).toEqual(true);
    });

    backend.expectOne({
      url: authorizationUrl + TOURNAMENTS_ENDPOINT + STAFF_ENDPOINT + tournamentId,
      method: 'GET'
    }).flush({ isAuthorized: true });
  })));

});

import { TestBed } from '@angular/core/testing';

import { TokenMaintenanceService } from './token-maintenance.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperWrapperService } from './jwt-helper-wrapper.service';
import { TokenStorageService } from './token-storage.service';
import { AUTHENTICATION_HOST, AUTHENTICATION_ENDPOINT } from '../rest-api';


class TokenStorageSpy {
  getAccessCalled: boolean = false;
  getRefreshCalled: boolean = false;
  setAccessToken: string = "";
  setRefreshToken: string = "";
  clearCalled: boolean = false;
  getAccessReturnValues: string[] = [];
  getRefreshReturnValues: string[] = [];
  getAccess() {
    this.getAccessCalled = true;
    return this.getAccessReturnValues.shift();
  }

  getRefresh() {
    this.getRefreshCalled = true;
    return this.getRefreshReturnValues.shift();
  }

  setAccess(token: string) {
    this.setAccessToken = token;
  }

  setRefresh(token: string) {
    this.setRefreshToken = token;
  }

  clearTokens() {
    this.clearCalled = true;
  }
}

class JwtHelperSpy {
  isExpiredArgument: string = "";
  isExpiredResult: boolean;
  isExpired(token: string) {
    return this.isExpiredResult;
  }
}

const authenticationUrl: string = AUTHENTICATION_HOST + AUTHENTICATION_ENDPOINT;

describe('TokenMaintenanceService', () => {
  let tokenStorage: TokenStorageSpy;
  let jwtHelper: JwtHelperSpy;
  let backend: HttpTestingController;
  let service: TokenMaintenanceService;

  beforeEach(() => {
    tokenStorage = new TokenStorageSpy();
    tokenStorage.getAccessReturnValues.push("token");
    tokenStorage.getAccessReturnValues.push("token2");
    tokenStorage.getRefreshReturnValues.push("refresh");
    tokenStorage.getRefreshReturnValues.push("refresh2");
    jwtHelper = new JwtHelperSpy();
    TestBed.configureTestingModule({
      providers: [
        { provide: JwtHelperWrapperService, useValue: jwtHelper },
        { provide: TokenStorageService, useValue: tokenStorage }],
      imports: [HttpClientTestingModule]
    });
    backend = TestBed.get(HttpTestingController);
    service = TestBed.get(TokenMaintenanceService);
  });
  afterEach(() => {
    backend.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("when access token is outdated but refresh is active", () => {
    beforeEach(() => {
      jwtHelper.isExpiredResult = true;
    });
    it('should try to renew expired tokens and notify about outcome', () => {
      service.updateTokens();
      expect(tokenStorage.getAccessCalled).toBe(true);
      expect(tokenStorage.getRefreshCalled).toBe(true);
      const req = backend.expectOne(authenticationUrl + '/token/refresh');
      expect(req.request.body).toEqual({ "refresh": "refresh" });
      expect(req.request.method).toBe('POST');
      req.flush({ "access": "access2", "refresh": "refresh2" });
      expect(tokenStorage.setAccessToken).toBe("access2");
      expect(tokenStorage.setRefreshToken).toBe("refresh2");
    });

    it("should clear tokens if refresh attempt ends with error", () => {
      jwtHelper.isExpiredResult = true;
      service.updateTokens();
      const req = backend.expectOne(authenticationUrl + '/token/refresh');
      expect(req.request.method).toBe('POST');
      req.flush("Invalid token", { status: 400, statusText: "Forbidden" });
      expect(tokenStorage.getAccessCalled).toBeTruthy("access");
      expect(tokenStorage.getRefreshCalled).toBeTruthy("refresh");
      expect(tokenStorage.clearCalled).toBeTruthy("clear");
    });
  });

  describe("when both tokens are fresh", () => {
    it("should not call auth api", () => {
      service.updateTokens();
      expect(tokenStorage.getAccessCalled).toBeTruthy("access");
    });
  });
});

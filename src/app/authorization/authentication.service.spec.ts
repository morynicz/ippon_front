import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JwtHelperWrapperService } from "./jwt-helper-wrapper.service";
import { TokenStorageService } from "./token-storage.service";

import { AuthenticationService } from './authentication.service';

import {
  AUTHENTICATION_HOST,
  AUTHENTICATION_ENDPOINT,
  TOKEN_ENDPOINT
} from '../rest-api';

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

describe('AuthenticationService', () => {
  let tokenStorage: TokenStorageSpy;
  let jwtHelper: JwtHelperSpy;
  let service: AuthenticationService;
  let backend: HttpTestingController;
  let loggedIn: boolean = false;
  let callback = (isLoggedIn: boolean) => {
    loggedIn = isLoggedIn;
  }

  beforeEach(() => {
    tokenStorage = new TokenStorageSpy();
    tokenStorage.getAccessReturnValues.push("token");
    tokenStorage.getAccessReturnValues.push("token2");
    tokenStorage.getRefreshReturnValues.push("refresh");
    tokenStorage.getRefreshReturnValues.push("refresh2");
    jwtHelper = new JwtHelperSpy();
    TestBed.configureTestingModule({
      providers: [AuthenticationService,
        { provide: JwtHelperWrapperService, useValue: jwtHelper },
        { provide: TokenStorageService, useValue: tokenStorage }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(AuthenticationService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  it('should call the authentication API when logIn() is called',
    () => {
      service.logIn("user", "password").subscribe();
      const req = backend.expectOne(authenticationUrl + TOKEN_ENDPOINT);
      expect(req.request.method).toBe('POST');
    });

  it('should broadcast change in authentication status when logIn resolves', () => {
    service.statusChangeStream.subscribe(msg => loggedIn = msg);
    service.logIn("user", "password").subscribe();
    const req = backend.expectOne({
      url: authenticationUrl + '/token',
      method: 'POST'
    }).flush({ "access": "access", "refresh": "refresh" });
    expect(loggedIn).toBeTruthy();
  });

  it('should store store retrieved tokens in tokenStorage when logIn called',
    () => {
      service.logIn("user", "password").subscribe();
      const req = backend.expectOne({
        url: authenticationUrl + '/token',
        method: 'POST'
      }).flush({ "access": "access", "refresh": "refresh" });
      expect(tokenStorage.setAccessToken).toBe("access");
      expect(tokenStorage.setRefreshToken).toBe("refresh");
    });

  it('should call jwtHelper.isExpired when isLoggedIn called',
    () => {
      jwtHelper.isExpiredResult = false;
      service.isLoggedIn().subscribe(resp => expect(resp).toBeTruthy());
      expect(tokenStorage.getAccessCalled).toBe(true);
    });

  describe("when logOutCalled", () => {
    it('should clear the tokens and notify',
      () => {
        loggedIn = true;
        service.statusChangeStream.subscribe(msg => loggedIn = msg);
        service.logOut();
        expect(tokenStorage.clearCalled).toBe(true);
        expect(loggedIn).toBeFalsy();
      });
  });

  describe("when access is expired but refresh active", () => {
    beforeEach(() => {
      jwtHelper.isExpiredResult = true;
      service.statusChangeStream.subscribe(msg => loggedIn = msg);
    });
    it('should try to renew expired tokens and notify about outcome', () => {
      service.isLoggedIn().subscribe(resp => expect(resp).toBeTruthy());
      expect(tokenStorage.getAccessCalled).toBe(true);
      expect(tokenStorage.getRefreshCalled).toBe(true);
      const req = backend.expectOne(authenticationUrl + '/token/refresh');
      expect(req.request.body).toEqual({ "refresh": "refresh" });
      expect(req.request.method).toBe('POST');
      req.flush({ "access": "access2", "refresh": "refresh2" });
      expect(loggedIn).toBeTruthy();
    });

    it("should clear tokens if refresh attempt ends with error", () => {
      jwtHelper.isExpiredResult = true;
      loggedIn = true;
      service.isLoggedIn().subscribe(resp => expect(resp).toBeFalsy());
      const req = backend.expectOne(authenticationUrl + '/token/refresh');
      expect(req.request.method).toBe('POST');
      req.flush("Invalid token", { status: 400, statusText: "Forbidden" });
      expect(tokenStorage.getAccessCalled).toBeTruthy("access");
      expect(tokenStorage.getRefreshCalled).toBeTruthy("refresh");
      expect(tokenStorage.clearCalled).toBeTruthy("clear");
      expect(loggedIn).toBeFalsy();
    });
  });

  it("should not call auth api when tokens are empty", () => {
    jwtHelper.isExpiredResult = true;
    tokenStorage.getAccessReturnValues = [null];
    tokenStorage.getRefreshReturnValues = [null];
    service.isLoggedIn().subscribe(resp => expect(resp).toBeFalsy());
  });
});

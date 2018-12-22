import { TestBed, inject, async } from '@angular/core/testing';
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

  it('should clear the tokens when logout() called',
    () => {
      service.logOut();
      expect(tokenStorage.clearCalled).toBe(true);
    });

  it('should try to renew expired tokens if access is expired but refresh active', () => {
    jwtHelper.isExpiredResult = true;
    service.isLoggedIn().subscribe(resp => expect(resp).toBeTruthy());
    expect(tokenStorage.getAccessCalled).toBe(true);
    expect(tokenStorage.getRefreshCalled).toBe(true);
    const req = backend.expectOne(authenticationUrl + '/token/refresh');
    expect(req.request.body).toEqual({ "refresh": "refresh" });
    expect(req.request.method).toBe('POST');
    req.flush({ "access": "access2", "refresh": "refresh2" });
  });

  it("should clear tokens if refresh attempt ends with error", () => {
    jwtHelper.isExpiredResult = true;
    service.isLoggedIn().subscribe(resp => expect(resp).toBeFalsy());
    const req = backend.expectOne(authenticationUrl + '/token/refresh');
    expect(req.request.method).toBe('POST');
    req.flush("Invalid token", { status: 400, statusText: "Forbidden" });
    expect(tokenStorage.getAccessCalled).toBeTruthy("access");
    expect(tokenStorage.getRefreshCalled).toBeTruthy("refresh");
    expect(tokenStorage.clearCalled).toBeTruthy("clear");
  });
});

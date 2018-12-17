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
  setAccessToken: string = "";
  setRefreshToken: string = "";
  clearCalled: boolean = false;
  getAccess() {
    this.getAccessCalled = true;
    return 'token';
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
      expect(service.isLoggedIn()).toBe(true);
      expect(tokenStorage.getAccessCalled).toBe(true);
    });

  it('should clear the tokens when logout() called',
    () => {
      service.logOut();
      expect(tokenStorage.clearCalled).toBe(true);
    });
});

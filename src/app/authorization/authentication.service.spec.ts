import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JwtHelperWrapperService } from "./jwt-helper-wrapper.service";
import { TokenStorageService } from "./token-storage.service";

import { AuthenticationService } from './authentication.service';

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

const authenticationUrl = "http://localhost:8000/auth";

describe('AuthenticationService', () => {
  let tokenStorage: TokenStorageSpy;
  let jwtHelper: JwtHelperSpy;
  beforeEach(() => {
    tokenStorage = new TokenStorageSpy();
    jwtHelper = new JwtHelperSpy();
    TestBed.configureTestingModule({
      providers: [AuthenticationService,
        { provide: JwtHelperWrapperService, useValue: jwtHelper },
        { provide: TokenStorageService, useValue: tokenStorage }],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should call the authentication API when logIn() is called',
    inject([AuthenticationService, HttpTestingController],
      (service: AuthenticationService, http: HttpTestingController) => {
        service.logIn("user", "password").subscribe();
        const req = http.expectOne({
          url: authenticationUrl + '/token',
          method: 'POST'
        });
      }));

  it('should store store retrieved tokens in tokenStorage when logIn called',
    async(inject([AuthenticationService, HttpTestingController],
      (service: AuthenticationService, http: HttpTestingController) => {
        service.logIn("user", "password").subscribe();
        const req = http.expectOne({
          url: authenticationUrl + '/token',
          method: 'POST'
        }).flush({ "access": "access", "refresh": "refresh" });
        expect(tokenStorage.setAccessToken).toBe("access");
        expect(tokenStorage.setRefreshToken).toBe("refresh");
      })));

  it('should call jwtHelper.isExpired when isLoggedIn called',
    inject([AuthenticationService], (service: AuthenticationService) => {
      jwtHelper.isExpiredResult = false;
      expect(service.isLoggedIn()).toBe(true);
      expect(tokenStorage.getAccessCalled).toBe(true);
    }));

  it('should clear the tokens when logout() called',
    inject([AuthenticationService], (service: AuthenticationService) => {
      service.logOut();
      expect(tokenStorage.clearCalled).toBe(true);
    }));
});

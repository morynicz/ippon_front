import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TokenStorageService } from './token-storage.service';

import { AuthenticationInterceptor } from './authentication-interceptor';
import { TokenMaintenanceService } from './token-maintenance.service';

class TokenStorageSpy {
  getAccessCalled: boolean = false;
  getAccessResult: string;
  getAccess(): string {
    return this.getAccessResult;
  }
}

class TokenMaintenanceServiceSpy {
  updateTokensCallCount: number = 0;
  updateTokens() {
    this.updateTokensCallCount += 1;
  }
}

describe('AuthenticationInterceptor', () => {
  let tokenStorage: TokenStorageSpy;
  let tokenMaintenanceServiceSpy: TokenMaintenanceServiceSpy
  beforeEach(() => {
    tokenStorage = new TokenStorageSpy();
    tokenMaintenanceServiceSpy = new TokenMaintenanceServiceSpy();
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptor,
        { provide: TokenStorageService, useValue: tokenStorage },
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        { provide: TokenMaintenanceService, useValue: tokenMaintenanceServiceSpy }
      ],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should add the id_token to header when token present',
    waitForAsync(inject([AuthenticationInterceptor, HttpClient, HttpTestingController],
      (interceptor: AuthenticationInterceptor,
        http: HttpClient,
        backend: HttpTestingController
      ) => {
        tokenStorage.getAccessResult = 'access';
        http.get<void>('api/').subscribe(response => expect(response).toBeTruthy());
        const request = backend.expectOne(req => (req.headers.has("Authorization")
          && req.headers.get("Authorization") === "Bearer access"));
        request.flush({ data: 'test' });
        backend.verify();
      })));

  it('should call token maintenance to keep token fresh',
    waitForAsync(inject([AuthenticationInterceptor, HttpClient, HttpTestingController],
      (interceptor: AuthenticationInterceptor,
        http: HttpClient,
        backend: HttpTestingController
      ) => {
        tokenStorage.getAccessResult = 'access';
        http.get<void>('api/').subscribe(response => expect(response).toBeTruthy());
        expect(tokenMaintenanceServiceSpy.updateTokensCallCount).toBe(1);
        backend.expectOne('api/');
      })));

  it('should add nothing to header when token not present',
    waitForAsync(inject([AuthenticationInterceptor, HttpClient, HttpTestingController],
      (interceptor: AuthenticationInterceptor,
        http: HttpClient,
        backend: HttpTestingController
      ) => {
        tokenStorage.getAccessResult = '';
        http.get<void>('api/').subscribe(response => expect(response).toBeTruthy());
        const request = backend.expectOne(req => (!req.headers.has("Authorization")));
        request.flush({ data: 'test' });
        backend.verify();
      })));
});

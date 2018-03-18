import { TestBed, inject, async } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TokenStorageService } from './token-storage.service';

import { AuthenticationInterceptor } from './authentication-interceptor';

class TokenStorageSpy {
  getAccessCalled: boolean = false;
  getAccess(): string {
    return 'access';
  }
}

describe('AuthenticationInterceptor', () => {
  let tokenStorage: TokenStorageSpy;
  beforeEach(() => {
    tokenStorage = new TokenStorageSpy();
    TestBed.configureTestingModule({
      providers: [AuthenticationInterceptor,
        { provide: TokenStorageService, useValue: tokenStorage },
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
      ],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('should add the id_token to header when token present',
    async(inject([AuthenticationInterceptor, HttpClient, HttpTestingController],
      (interceptor: AuthenticationInterceptor,
        http: HttpClient,
        backend: HttpTestingController
      ) => {
        http.get<void>('api/').subscribe(response => expect(response).toBeTruthy());
        const request = backend.expectOne(req => (req.headers.has("Authorization")
          && req.headers.get("Authorization") === "Bearer access"));
        request.flush({ data: 'test' });
        backend.verify();
      })));
});

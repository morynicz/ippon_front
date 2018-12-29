import { TestBed } from '@angular/core/testing';

import { UserRegistrationService } from './user-registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserRegistration } from './user-registartion';
import { IPPON_HOST, REGISTRATION_ENDPOINT } from '../rest-api';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let backend: HttpTestingController;
  let registrationUrl: string = IPPON_HOST + REGISTRATION_ENDPOINT;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(UserRegistrationService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe("when register is called", () => {
    it("calls the registration api url, uses POST method, \
    sends request with application/json content type headers, \
    sends the user to be created in body \
    and returns newly created resource", () => {
        let registration: UserRegistration = {
          username: "user1",
          password: "lonpassword",
          email: "email@email.com"
        }
        service.register(registration).subscribe(
          response => expect(response).toEqual({}));
        const req = backend.expectOne(registrationUrl);
        req.flush({});
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type'))
          .toBe(true);
        expect(req.request.headers.get('Content-Type'))
          .toBe('application/json');
        expect(req.request.body).toEqual(registration);

      });
  });

});

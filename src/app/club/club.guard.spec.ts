import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, convertToParamMap } from '@angular/router';
import { Component } from '@angular/core';

import { ClubGuard } from './club.guard';

import { AuthenticationService } from '../authorization/authentication.service';
import { ClubService } from './club.service';
import { ClubServiceSpy } from './club.service.spy';

class AuthenticationServiceDummy {
  authenticated: boolean;
};

class RouterStateSnapshotStub {
  url: any;
  root: any;
}

@Component({
  template: ''
})
class StubComponent { }

describe('ClubGuard', () => {
  let clubService: ClubServiceSpy;
  let authenticationServiceDummy: AuthenticationServiceDummy;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let clubId: number = 42;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StubComponent],
      imports: [RouterTestingModule.withRoutes([
        {
          path: 'club/:clubId/edit',
          canActivate: [ClubGuard],
          component: StubComponent
        }
      ])],
      providers: [
        ClubGuard,
        {
          provide: ClubService,
          useClass: ClubServiceSpy
        },
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceDummy
        },
        {
          provide: RouterStateSnapshot,
          useClass: RouterStateSnapshotStub
        },
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            paramMap: convertToParamMap({ id: clubId })
          }
        }
      ]
    });
  }));

  beforeEach(() => {
    clubService = TestBed.get(ClubService);
    authenticationServiceDummy = TestBed.get(AuthenticationService);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
  });

  it('should return true when user is logged in and authorized club admin',
    waitForAsync(inject(
      [ClubGuard, Router],
      (guard: ClubGuard) => {
        clubService.isAuthorizedReturnValue = true;
        authenticationServiceDummy.authenticated = true;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeTruthy());
        expect(clubService.isAuthorizedValue).toBe(42);
      })));


  it('should return false when user is logged in and not authorized club admin',
    waitForAsync(inject(
      [ClubGuard, Router],
      (guard: ClubGuard) => {
        clubService.isAuthorizedReturnValue = false;
        authenticationServiceDummy.authenticated = true;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeFalsy());
        expect(clubService.isAuthorizedValue).toBe(42);
      })));

  it('should return false when user is not logged in',
    waitForAsync(inject(
      [ClubGuard, Router],
      (guard: ClubGuard) => {
        clubService.isAuthorizedReturnValue = false;
        authenticationServiceDummy.authenticated = false;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeFalsy());
      })));
});

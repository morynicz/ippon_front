import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, ParamMap, convertToParamMap } from '@angular/router';
import { Component, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubGuard } from './club.guard';

import { AuthorizationService } from '../authorization/authorization.service';
import { Authorization } from "../authorization/Authorization";
import { AuthenticationService } from '../authorization/authentication.service';

class AuthorizationServiceMock {
  isClubAdminValue: boolean;
  called: number;
  isClubAdmin(id: number): Observable<boolean> {
    this.called = id;
    return of(this.isClubAdminValue);
  }
};

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
  let authorizationServiceMock: AuthorizationServiceMock;
  let authenticationServiceDummy: AuthenticationServiceDummy;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let clubId: number = 42;

  beforeEach(async(() => {
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
          provide: AuthorizationService,
          useClass: AuthorizationServiceMock
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
    authorizationServiceMock = TestBed.get(AuthorizationService);
    authenticationServiceDummy = TestBed.get(AuthenticationService);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
  });

  it('should return true when user is logged in and authorized club admin',
    async(inject(
      [ClubGuard, Router],
      (guard: ClubGuard, router: Router) => {
        authorizationServiceMock.isClubAdminValue = true;
        authenticationServiceDummy.authenticated = true;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeTruthy());
        expect(authorizationServiceMock.called).toBe(42);
      })));


  it('should return false when user is logged in and not authorized club admin',
    async(inject(
      [ClubGuard, Router],
      (guard: ClubGuard, router: Router) => {
        authorizationServiceMock.isClubAdminValue = false;
        authenticationServiceDummy.authenticated = true;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeFalsy());
        expect(authorizationServiceMock.called).toBe(42);
      })));

  it('should return false when user is not logged in',
    async(inject(
      [ClubGuard, Router],
      (guard: ClubGuard, router: Router) => {
        authorizationServiceMock.isClubAdminValue = true;
        authenticationServiceDummy.authenticated = false;
        guard.canActivate(activatedRouteSnapshot, new RouterStateSnapshotStub()).subscribe(
          result => expect(result).toBeFalsy());
      })));

  it('should ...', async(inject([ClubGuard], (guard: ClubGuard) => {
    expect(guard).toBeTruthy();
  })));
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavbarComponent } from './navbar.component';

import { AuthenticationService } from '../authorization/authentication.service';
import { Observable, of } from 'rxjs';

class AuthenticationServiceSpy {
  isLoggedInCalled: boolean = false;
  logOutCalled: boolean = false;
  isLoggedInResult: boolean;
  registerCalled: boolean = false;
  callback: (isLoggedIn: boolean) => void;
  isLoggedIn(): Observable<boolean> {
    this.isLoggedInCalled = true;
    return of(this.isLoggedInResult);
  }

  logOut() {
    this.logOutCalled = true;
  }

  registerStatusChangeCallback(callback: (isLoggedIn: boolean) => void): void {
    this.registerCalled = true;
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthenticationServiceSpy;

  beforeEach(async(() => {
    authService = new AuthenticationServiceSpy();
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthenticationService, useValue: authService }
      ]
    })
      .compileComponents();
  }));

  describe("when user is not logged in", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should ask authenticationService if the user is signedIn', async(() => {
      expect(authService.isLoggedInCalled).toBeTruthy();
    }));

    it("should register for auth state change notifications", () => {
      expect(authService.registerCalled).toBeTruthy();
    });
  });

  describe("when user is logged in", () => {
    beforeEach(() => {
      authService.isLoggedInResult = true;
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call authenticationService to logOut', () => {
      fixture.detectChanges();
      let btn = fixture.debugElement.query(By.css("#logout"));
      btn.nativeElement.click();
      fixture.detectChanges();
      expect(authService.logOutCalled).toBeTruthy();
    });

  });
});

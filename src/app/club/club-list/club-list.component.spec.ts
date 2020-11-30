import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubListComponent } from './club-list.component';
import { ClubLineComponent } from './../club-line/club-line.component';
import { Club } from '../club';
import { ClubService } from './../club.service';
import { AuthenticationService } from '../../authorization/authentication.service';
import { ClubServiceSpy } from '../club.service.spy';

const clubs: Club[] = [
  {
    id: 1,
    name: 'C1',
    description: 'D1',
    city: 'Ci1',
    webpage: 'W1'
  },
  {
    id: 2,
    name: 'C2',
    description: 'D2',
    city: 'Ci2',
    webpage: 'W2'
  }
];

class AuthenticationServiceSpy {
  isLoggedInResult: boolean = false;
  isLoggedInCalled: boolean = false;
  isLoggedIn(): Observable<boolean> {
    this.isLoggedInCalled = true;
    return of(this.isLoggedInResult);
  }
}



describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;
  let clubService: ClubServiceSpy;
  let authenticationService: AuthenticationServiceSpy;

  beforeEach(waitForAsync(() => {
    clubService = new ClubServiceSpy();
    clubService.getListReturnValues.push(clubs);
    authenticationService = new AuthenticationServiceSpy();

    TestBed.configureTestingModule({
      declarations: [ClubListComponent, ClubLineComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ClubService, useValue: clubService },
        { provide: AuthenticationService, useValue: authenticationService }
      ]
    })
      .compileComponents();
  }));

  describe("when user is not logged in", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(ClubListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load clubs using club.service.getClubs() on init', waitForAsync(() => {
      fixture.whenStable().then(() => {
        expect(clubService.getListValue).toBeTruthy();
      });
    }));

    it('should display loaded clubs', waitForAsync(() => {
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const clubLines = html.querySelectorAll('ippon-club-line');

        expect(clubLines[0].textContent).toContain('C1');
        expect(clubLines[0].textContent).toContain('Ci1');
        expect(clubLines[1].textContent).toContain('C2');
        expect(clubLines[1].textContent).toContain('Ci2');
      });
    }));

    it('should not display "add Club" button if user not signed in', waitForAsync(() => {
      authenticationService.isLoggedInResult = false;
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const button = html.querySelector('button');

        expect(button).toBeFalsy();
      });
    }));
  });
  describe("when user is logged in", () => {
    beforeEach(() => {
      authenticationService.isLoggedInResult = true;
      fixture = TestBed.createComponent(ClubListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });


    it('should should display "add Club" button if auth service isLoggedIn returns true', waitForAsync(() => {
      authenticationService.isLoggedInResult = true;
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const button = html.querySelector('button');

        expect(authenticationService.isLoggedInCalled).toBeTruthy();
        expect(button).toBeTruthy();
      });
    }));
  });
});

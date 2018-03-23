import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubListComponent } from './club-list.component';
import { ClubLineComponent } from './../club-line/club-line.component';
import { Club } from '../club';
import { ClubService } from './../club.service';
import { AuthenticationService } from '../../authorization/authentication.service';


class ClubServiceSpy {
  getClubsCalled: boolean = false;
  getClubsResult: Club[];
  getClubs(): Observable<Club[]> {
    this.getClubsCalled = true;
    return of(this.getClubsResult);
  }
}

class AuthenticationServiceSpy {
  isLoggedInResult: boolean = false;
  isLoggedInCalled: boolean = false;
  isLoggedIn(): boolean {
    this.isLoggedInCalled = true;
    return this.isLoggedInResult;
  }
}

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;
  let clubService: ClubServiceSpy;
  let authenticationService: AuthenticationServiceSpy;

  beforeEach(async(() => {
    clubService = new ClubServiceSpy();
    clubService.getClubsResult = [
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

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clubs using club.service.getClubs() on init', async(() => {
    fixture.whenStable().then(() => {
      expect(clubService.getClubsCalled).toBeTruthy();
    });
  }));

  it('should display loaded clubs', async(() => {
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const clubLines = html.querySelectorAll('app-club-line');

      expect(clubLines[0].textContent).toContain('C1');
      expect(clubLines[0].textContent).toContain('Ci1');
      expect(clubLines[1].textContent).toContain('C2');
      expect(clubLines[1].textContent).toContain('Ci2');
    });
  }));

  it('should not display "add Club" button if user not signed in', async(() => {
    authenticationService.isLoggedInResult = false;
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const button = html.querySelector('button');

      expect(button).toBeFalsy();
    });
  }));

  it('should should display "add Club" button if auth service isLoggedIn returns true', async(() => {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationFormComponent } from './user-registration-form.component';
import { UserRegistration } from '../user-registartion';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRegistrationService } from '../user-registration.service';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';

const registration: UserRegistration = {
  username: "user1",
  password: "lonpassword",
  email: "email@email.com"
}

class LocationSpy {
  clicked: boolean = false;
  back(): void {
    this.clicked = true;
  }
}


class UserRegistrationServiceSpy {
  registrationCallValues: UserRegistration[] = [];
  register(registration: UserRegistration): Observable<{}> {
    this.registrationCallValues.push(registration);
    return of({});
  }
}

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let fixture: ComponentFixture<UserRegistrationFormComponent>;
  let userRegistrationService: UserRegistrationServiceSpy;
  let location: LocationSpy;

  beforeEach(async(() => {
    userRegistrationService = new UserRegistrationServiceSpy();
    location = new LocationSpy();
    TestBed.configureTestingModule({
      declarations: [UserRegistrationFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: UserRegistrationService, useValue: userRegistrationService },
        { provide: Location, useValue: location },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("when form is filled out and submit button is clicked", () => {
    let btn;
    beforeEach(() => {
      btn = fixture.debugElement.query(By.css("#register-user"));
      component.registration = registration;
      fixture.detectChanges();
      btn.nativeElement.click();
      fixture.detectChanges();
    });

    it("should call registration service to register new player", () => {
      expect(userRegistrationService.registrationCallValues).toContain(registration);
    });

    it("should go back to root of application", async(() => {
      fixture.whenStable().then(
        () => expect(location.clicked).toBeTruthy()
      );
    }));
  });
});

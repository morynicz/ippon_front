import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { FormsModule } from '@angular/forms';

import { Credentials, LoginFormComponent } from './login-form.component';
import { AuthenticationService } from '../authentication.service';

class AuthenticationServiceSpy {
  password: string;
  email: string;

  logIn(email: string, password: string): Observable<void> {
    this.password = password;
    this.email = email;
    return of();
  }
}

function setInput(name: string, value: string, fixture: ComponentFixture<LoginFormComponent>): void {
  const input = fixture.debugElement.query(By.css('input[name="' + name + '"]'));
  input.nativeElement.value = value;
  input.nativeElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authService: AuthenticationServiceSpy;
  let el: HTMLElement;

  beforeEach(async(() => {
    authService = new AuthenticationServiceSpy();
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthenticationService, useValue: authService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logIn function of authentication service when log in button pressed', async(() => {
    fixture.whenStable().then(() => {
      setInput('email', 'email@server.com', fixture);
      setInput('password', 'password1', fixture);
      let btn = fixture.debugElement.query(By.css("button"));
      btn.triggerEventHandler('click', null);
      expect(authService.email).toBe('email@server.com');
      expect(authService.password).toBe('password1');
    });
  }));
});

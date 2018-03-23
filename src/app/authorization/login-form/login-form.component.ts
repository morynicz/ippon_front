import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class Credentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  credentials: Credentials;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.credentials = new Credentials();
  }

  logIn(): void {
    this.authenticationService.logIn(this.credentials.email, this.credentials.password)
      .subscribe(() => {
        this.router.navigateByUrl("/");
      });
  }
}

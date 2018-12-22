import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authorization/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string = "user";
  isLoggedIn: boolean = false;
  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isLoggedIn()
      .subscribe(resp => this.isLoggedIn = resp);
    this.authService.registerStatusChangeCallback(
      this.logInStateChangeCallback);
  }

  changeLanguage(language: string): void {

  }

  logInStateChangeCallback(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  logout(): void {
    this.authService.logOut();
  }
}

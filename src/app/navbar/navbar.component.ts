import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authorization/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string = "user";
  constructor(private authService: AuthenticationService) { }

  ngOnInit() { }

  changeLanguage(language: string): void {

  }

  signedIn(): boolean { return this.authService.isLoggedIn(); }

  logout(): void {
    this.authService.logOut();
  }
}

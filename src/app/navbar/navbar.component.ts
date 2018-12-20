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
  }

  changeLanguage(language: string): void {

  }

  logout(): void {
    this.authService.logOut();
  }
}

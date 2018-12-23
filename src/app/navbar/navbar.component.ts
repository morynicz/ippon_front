import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authorization/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: string = "user";
  isLoggedIn: boolean = false;
  private authChangeSubscripion: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isLoggedIn()
      .subscribe(resp => this.isLoggedIn = resp);
    this.authChangeSubscripion = this.authService
      .statusChangeStream.subscribe(
        msg => this.isLoggedIn = msg);
  }

  changeLanguage(language: string): void {

  }

  logInStateChangeCallback(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  logout(): void {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.authChangeSubscripion.unsubscribe();
  }
}

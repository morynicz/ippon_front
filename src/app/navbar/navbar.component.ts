import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string = "user";
  constructor() { }

  ngOnInit() {
  }

  changeLanguage(language: string): void {

  }

  signedIn(): boolean { return false; }

  logout(): void { }
}

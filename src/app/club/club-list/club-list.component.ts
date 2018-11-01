import { Component, OnInit } from '@angular/core';

import { ClubService } from '../club.service';
import { Club } from '../club';
import { AuthenticationService } from '../../authorization/authentication.service';

@Component({
  selector: 'ippon-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: Club[];
  constructor(
    private clubService: ClubService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getList().subscribe(clubs => this.clubs = clubs);
  }

  signedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}

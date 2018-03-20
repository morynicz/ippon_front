import { Component, OnInit } from '@angular/core';

import { ClubService } from '../club.service';
import { Club } from '../club';

@Component({
  selector: 'ippon-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: Club[];
  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(clubs => this.clubs = clubs);
  }

  signedIn(): boolean {
    return true;
  }
}

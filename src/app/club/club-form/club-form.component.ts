import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ClubService } from "../club.service";
import { Club } from '../club';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent implements OnInit {
  club: Club;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getClub();
    } else {
      this.club = new Club();
    }
  }

  getClub(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clubService.getClub(id).subscribe(club => this.club = club);
  }

  save(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.clubService.updateClub(this.club).subscribe(() => this.goBack());
    } else {
      this.clubService.addClub(this.club).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Player } from '../../player/player'

import { ClubService } from '../club.service';
import { Club } from '../club';

import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'app-club-full',
  templateUrl: './club-full.component.html',
  styleUrls: ['./club-full.component.css']
})
export class ClubFullComponent implements OnInit {
  club: Club;
  players: Player[];
  isAdmin: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private clubService: ClubService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getClub(id);
    this.getPlayers(id);
    this.getAuthorization(id);
  }

  getClub(id: number): void {
    this.clubService.getClub(id).subscribe(club => {
      this.club = club;
    });
  }

  getPlayers(id: number): void {
    this.clubService.getPlayers(id).subscribe(players => {
      this.players = players;
    });
  }

  getAuthorization(id: number): void {
    this.authorizationService.isClubAdmin(id).subscribe((auth) => {
      this.isAdmin = auth;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Player } from '../../player/player'

import { ClubService } from '../club.service';
import { Club } from '../club';


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
    private clubService: ClubService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.getClub(id);
    this.getPlayers(id);
    this.getAuthorization(id);
  }

  getClub(id: number): void {
    this.clubService.get(id).subscribe(club => {
      this.club = club;
    });
  }

  getPlayers(id: number): void {
    this.clubService.getPlayers(id).subscribe(players => {
      this.players = players;
    });
  }

  getAuthorization(id: number): void {
    this.clubService.isAuthorized(id).subscribe((auth) => {
      this.isAdmin = auth;
    });
  }

  deleteClub(): void {
    this.clubService.delete(this.club);
  }
}

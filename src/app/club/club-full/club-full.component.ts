import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../../player/player.service';
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
    private location: Location,
    private router: Router,
    private playerService: PlayerService,
    private clubService: ClubService
  ) { }

  ngOnInit() {
    this.getClub();
    this.getPlayers();
  }

  getClub(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`id: ${id}`);
    this.clubService.getClub(id).subscribe(club => {
      this.club = club;
    });
  }

  getPlayers(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayers().subscribe(players => {
      console.log(players);
      this.players = players.filter(player => player.club_id === id);
    });
  }

}

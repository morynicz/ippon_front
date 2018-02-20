import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../player.service';
import { Player, Sex, Rank } from '../player'

import { ClubService } from '../../club/club.service';
import { Club } from '../../club/club';

@Component({
  selector: 'app-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.css']
})
export class PlayerFullComponent implements OnInit {
  player: Player;
  club: Club;
  isAdmin: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private playerService: PlayerService,
    private clubService: ClubService
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id).subscribe(player => {
      this.player = player;
      this.clubService.getClub(player.club_id).subscribe(club => this.club = club);
    }
    );
  }

  goBack(): void {
    this.location.back();
  }

  editPlayer(): void {
    this.router.navigate(['/players', this.player.id, '/edit']);
  }

  deletePlayer(): void {
    this.playerService.deletePlayer(this.player).subscribe(() => this.location.back());
  }
}

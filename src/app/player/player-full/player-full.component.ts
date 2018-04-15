import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../player.service';
import { Player, Sex, Rank, RANK_STRINGS } from '../player'

import { ClubService } from '../../club/club.service';
import { Club } from '../../club/club';

import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

@Component({
  selector: 'ippon-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.css']
})
export class PlayerFullComponent implements OnInit {
  player: Player;
  club: Club;
  isAdmin: boolean = false;
  sexEnum = Sex;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private playerService: PlayerService,
    private clubService: ClubService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.getPlayer(id).subscribe(player => {
      this.player = player;
      this.getClub(player.club_id);
      this.getAuthorization(player.club_id);
    });
  }

  getClub(clubId: number): void {
    this.clubService.getClub(clubId).subscribe(club => this.club = club);
  }

  getAuthorization(clubId: number): void {
    this.authorizationService.isClubAdmin(clubId)
      .subscribe(response => this.isAdmin = response);
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

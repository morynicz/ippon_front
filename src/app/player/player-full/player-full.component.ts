import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../player.service';
import { Player } from '../player'
import { Rank, RANK_STRINGS } from '../../rank';
import { Sex } from '../../sex';

import { ClubService } from '../../club/club.service';
import { Club } from '../../club/club';

import { AuthorizationService } from '../../authorization/authorization.service';
import { Authorization } from "../../authorization/Authorization";

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
    this.playerService.get(id).subscribe(player => {
      this.player = player;
      this.getAuthorization(player);
    });
  }
  getAuthorization(player: Player): void {
    this.playerService.isAuthorized(player.id)
      .subscribe(response => this.isAdmin = response);
  }

  goBack(): void {
    this.location.back();
  }

  editPlayer(): void {
    this.router.navigate(['/players', this.player.id, '/edit']);
  }

  deletePlayer(): void {
    this.playerService.delete(this.player).subscribe(() => this.location.back());
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Rank, RANK_STRINGS } from '../../rank';

import { ClubService } from '../../club/club.service';
import { Club } from '../../club/club'
import { DeepPlayer } from '../deep-player';
import { DeepPlayerService } from '../deep-player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  player: DeepPlayer;
  clubs: Club[];
  rankEnum: any;
  ranks: any[];
  rank_strings: string[];

  constructor(
    private route: ActivatedRoute,
    private playerService: DeepPlayerService,
    private clubService: ClubService,
    private location: Location,
    private router: Router
  ) {
    this.rank_strings = RANK_STRINGS;
    this.ranks = Object.keys(Rank).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.getPlayer();
    } else {
      this.initializePlayer();
      this.handleQueryParams();
    }
    this.getClubs();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(player => this.player = player);
  }

  handleQueryParams(): void {
    this.route.queryParams.subscribe(params => {
      if (params["clubId"]) {
        this.player.club_id = +params["clubId"];
      }
    });
  }

  getClubs(): void {
    this.clubService.getList().subscribe(clubs => this.clubs = clubs);
  }

  initializePlayer() {
    this.player = new DeepPlayer();
  }

  rankCompare(r1: Rank, r2: Rank): boolean {
    return r1 == r2;
  }

  save(): void {
    if (this.route.snapshot.paramMap.has('id')) {
      this.playerService.update(this.player).subscribe(() => this.goBack());
    } else {
      this.playerService.add(this.player).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}

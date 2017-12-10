import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Player, Sex, Rank, RANK_STRINGS } from '../player'
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  player: Player;
  rankEnum: any;
  ranks: any[];
  rank_strings: string[];

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location,
    private router: Router
  ) {
    this.rank_strings = RANK_STRINGS;
    this.ranks = Object.keys(Rank).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`id: ${id}`);
    this.playerService.getPlayer(id).subscribe(player => this.player = player);
  }

  rankCompare(r1: Rank, r2: Rank): boolean {
    return r1 == r2;
  }

  save(): void {
    this.playerService.updatePlayer(this.player).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../player.service';
import { Player, Sex, Rank } from '../player'

@Component({
  selector: 'app-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.css']
})
export class PlayerFullComponent implements OnInit {
  player: Player;
  isAdmin: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`id: ${id}`);
    this.playerService.getPlayer(id).subscribe(player => this.player = player);
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

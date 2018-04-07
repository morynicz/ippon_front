import { Component, OnInit } from '@angular/core';
import { Player, Sex, Rank } from '../player';
import { PlayerService } from "../player.service"

@Component({
  selector: 'app-players',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[];
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers().subscribe(players => this.players = players);
  }
}

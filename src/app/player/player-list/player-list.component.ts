import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
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
    this.playerService.getList().subscribe(players => this.players = players);
  }
}

import { Component, OnInit } from '@angular/core';
import { Player, Sex, Rank, RANK_STRINGS } from '../player'

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent implements OnInit {
  player: Player = {
      name: 'Link',
      surname: 'Sursur',
      sex: Sex.Male,
      age: 28,
      rank: Rank.Kyu_1,
      club_id: 0,
      id: 0
  };
  rank: any;
  ranks: any[];
  rank_strings: string[];

  constructor() {
    this.rank_strings = RANK_STRINGS;
    this.rank = Rank;
    this.ranks = Object.keys(this.rank).filter(f => !isNaN(Number(f)));
 }

  ngOnInit() {
  }

}

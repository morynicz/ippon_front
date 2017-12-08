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
    birthday: new Date("2012-12-12"),
    rank: Rank.Kyu_1,
    club_id: 0,
    id: 0
  };
  rankEnum: any;
  ranks: any[];
  rank_strings: string[];

  constructor() {
    this.rank_strings = RANK_STRINGS;
    this.ranks = Object.keys(Rank).filter(f => !isNaN(Number(f)));
  }

  ngOnInit() {
  }

  rankCompare(r1: Rank, r2: Rank): boolean {
    return r1 == r2;
  }
}

import { Component, OnInit } from '@angular/core';
import { Player, Sex, Rank } from '../player'

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  player: Player = {
      name: 'Link',
      surname: 'Sursur',
      sex: Sex.Male,
      age: 28,
      rank: Rank.Kyu_1,
      club_id: 0,
      id: 0
  };
  constructor() { }

  ngOnInit() {
  }

}

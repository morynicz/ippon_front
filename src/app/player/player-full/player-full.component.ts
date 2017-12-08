import { Component, OnInit } from '@angular/core';
import { Player, Sex, Rank } from '../player'

@Component({
  selector: 'app-player-full',
  templateUrl: './player-full.component.html',
  styleUrls: ['./player-full.component.css']
})
export class PlayerFullComponent implements OnInit {
  player: Player = {
      name: 'Link',
      surname: 'Sursur',
      sex: Sex.Male,
      birthday: new Date("12.12.12"),
      rank: Rank.Kyu_1,
      club_id: 0,
      id: 0
  };

  constructor() {
  }

  ngOnInit() {
  }

}

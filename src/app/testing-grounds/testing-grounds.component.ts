import { Component, OnInit } from '@angular/core';
import { Fight } from '../fight/fight';
import { FightWinner } from '../fight-winner';
import { FightStatus } from '../fight-status';

@Component({
  selector: 'ippon-testing-grounds',
  templateUrl: './testing-grounds.component.html',
  styleUrls: ['./testing-grounds.component.css']
})
export class TestingGroundsComponent implements OnInit {

  fight: Fight;

  constructor() {
    this.fight = {
      id: 1,
      points: [],
      aka: 6,
      shiro: 7,
      team_fight: 1,
      orderingNumber: 0,
      winner: FightWinner.None,
      status: FightStatus.Prepared
    };
    console.log("tg con");
  }

  ngOnInit() {
    console.log("tg initt");
  }
}

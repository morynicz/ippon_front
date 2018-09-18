import { Component, OnInit } from '@angular/core';
import { Fight } from '../fight/fight';

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
      akaId: 6,
      shiroId: 7,
      teamFightId: 1,
      orderingNumber: 0
    };
    console.log("tg con");
  }

  ngOnInit() {
    console.log("tg initt");
  }
}

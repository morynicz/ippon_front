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
      akaId: 1,
      shiroId: 2,
      teamFightId: 33,
      orderingNumber: 0
    };
    console.log("tg con");
  }

  ngOnInit() {
    console.log("tg initt");
  }
}

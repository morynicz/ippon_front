import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player';


@Component({
  selector: 'ippon-player-line',
  templateUrl: './player-line.component.html',
  styleUrls: ['./player-line.component.css']
})
export class PlayerLineComponent implements OnInit {
  @Input() player: Player;
  constructor() { }

  ngOnInit() {
  }
}

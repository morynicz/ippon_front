import { Component, OnInit, Input } from '@angular/core';
import { Tournament } from '../tournament';

@Component({
  selector: 'app-tournament-line',
  templateUrl: './tournament-line.component.html',
  styleUrls: ['./tournament-line.component.css']
})
export class TournamentLineComponent implements OnInit {
  @Input() tournament: Tournament;
  constructor() { }

  ngOnInit() {
  }

}

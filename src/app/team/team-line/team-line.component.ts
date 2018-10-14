import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../team';

@Component({
  selector: 'ippon-team-line',
  templateUrl: './team-line.component.html',
  styleUrls: ['./team-line.component.css']
})
export class TeamLineComponent implements OnInit {
  @Input() team: Team;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Club } from "../club"

@Component({
  selector: 'app-club-line',
  templateUrl: './club-line.component.html',
  styleUrls: ['./club-line.component.css']
})
export class ClubLineComponent implements OnInit {
  @Input() club: Club;
  constructor() { }

  ngOnInit() {
  }

}

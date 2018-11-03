import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../team/team';
import { TeamFight } from '../team-fight';
import { TeamFightService } from '../team-fight.service';

@Component({
  selector: 'ippon-team-fight-form',
  templateUrl: './team-fight-form.component.html',
  styleUrls: ['./team-fight-form.component.css']
})
export class TeamFightFormComponent implements OnInit {
  @Input() teams: Team[];
  @Input() tournament: number;
  @Output() reloadRequest = new EventEmitter<any>();

  teamFight: TeamFight;
  constructor(private teamFightService: TeamFightService) {
    this.teamFight = new TeamFight();
  }

  ngOnInit() {
  }

  save(): void {
    this.teamFight.id = 0;
    this.teamFight.tournament = this.tournament;
    this.teamFightService.add(this.teamFight).subscribe(resp => {
      this.reloadRequest.emit('');
    });
  }
}

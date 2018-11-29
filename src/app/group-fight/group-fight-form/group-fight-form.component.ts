import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../../team/team';
import { TeamFight } from '../../team-fight/team-fight';
import { GroupFightService } from '../group-fight.service';
import { GroupFight } from '../group-fight';

@Component({
  selector: 'ippon-group-fight-form',
  templateUrl: './group-fight-form.component.html',
  styleUrls: ['./group-fight-form.component.css']
})
export class GroupFightFormComponent implements OnInit {

  @Input() teams: Team[];
  @Input() tournament: number;
  @Input() group: number;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private groupFightService: GroupFightService) { }

  ngOnInit() {
  }

  save(teamFight: TeamFight): void {
    let groupFight: GroupFight = {
      id: 0,
      group: this.group,
      team_fight: teamFight.id
    }
    this.groupFightService.add(groupFight).subscribe();
  }
}

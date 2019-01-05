import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupFight } from '../group-fight';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { TeamFight } from '../../team-fight/team-fight';

@Component({
  selector: 'ippon-group-fight-line',
  templateUrl: './group-fight-line.component.html',
  styleUrls: ['./group-fight-line.component.css']
})
export class GroupFightLineComponent implements OnInit {
  @Input() groupFight: GroupFight;

  @Input() isAuthorized: boolean = false;
  @Output() reloadRequest = new EventEmitter<any>();
  teamFight: TeamFight;
  constructor(private teamFightService: TeamFightService) { }

  ngOnInit() {
    if (this.groupFight != null) {
      this.teamFightService.get(this.groupFight.team_fight)
        .subscribe(result => this.teamFight = result);
    }
  }

  reload(): void {
    this.reloadRequest.emit('');
  }

}

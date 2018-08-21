import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player';
import { PointLineComponent } from '../../point/point-line/point-line.component';
import { PointService } from '../../point/point.service';
import { Point } from '../../point/point';
import { Fight } from '../fight';

@Component({
  selector: 'app-fight-full',
  templateUrl: './fight-full.component.html',
  styleUrls: ['./fight-full.component.css']
})
export class FightFullComponent implements OnInit {
  @Input() fight: Fight;
  akaPlayer: Player;
  shiroPlayer: Player;
  points: Point[];
  constructor(
    private playerService: PlayerService,
    private pointService: PointService) { }

  ngOnInit() {
    if (this.fight != undefined) {
      this.playerService.getPlayer(this.fight.akaId).subscribe(resp => this.akaPlayer = resp);
      this.playerService.getPlayer(this.fight.shiroId).subscribe(resp => this.shiroPlayer = resp);
      this.pointService.getList(this.fight.id).subscribe(resp => this.points = resp);
    }
  }

  reload(): void {

  }
}

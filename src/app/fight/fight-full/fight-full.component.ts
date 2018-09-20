import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player';
import { PointService } from '../../point/point.service';
import { Point } from '../../point/point';
import { Fight } from '../fight';
import { FightService } from '../fight.service';

@Component({
  selector: 'ippon-fight-full',
  templateUrl: './fight-full.component.html',
  styleUrls: ['./fight-full.component.css']
})
export class FightFullComponent implements OnInit {
  @Input() fight: Fight;
  akaPlayer: Player;
  shiroPlayer: Player;
  points: Point[];
  isAdmin: boolean;
  constructor(
    private playerService: PlayerService,
    private pointService: PointService,
    private fightService: FightService) { }

  ngOnInit() {
    if (this.fight != undefined) {
      this.playerService.getPlayer(this.fight.akaId).subscribe(resp => this.akaPlayer = resp);
      this.playerService.getPlayer(this.fight.shiroId).subscribe(resp => this.shiroPlayer = resp);
      this.loadPoints();
    }
    this.isAdmin = false;
    this.fightService.isAuthorized(this.fight.id).subscribe(isAuthorized => this.isAdmin = isAuthorized);
  }

  private loadPoints() {
    this.pointService.getList(this.fight.id).subscribe(resp => this.points = resp);
  }

  reload(): void {
    this.loadPoints();
  }
}

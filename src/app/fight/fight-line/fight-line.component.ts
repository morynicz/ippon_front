import { Component, OnInit, Input } from '@angular/core';
import { Fight } from '../fight';
import { PlayerService } from '../../player/player.service';
import { PointService } from '../../point/point.service';
import { Player } from '../../player/player';
import { Point } from '../../point/point';

@Component({
  selector: 'ippon-fight-line',
  templateUrl: './fight-line.component.html',
  styleUrls: ['./fight-line.component.css']
})
export class FightLineComponent implements OnInit {
  @Input() fight: Fight;
  akaPlayer: Player;
  shiroPlayer: Player;
  akaPoints: Point[];
  shiroPoints: Point[];
  constructor(private pointsService: PointService, private playerService: PlayerService) {
    this.akaPoints = new Array<Point>();
    this.shiroPoints = new Array<Point>();
  }

  ngOnInit() {
    this.pointsService.getList(this.fight.id).subscribe(result => {
      let points: Point[] = result;
      let point: Point;
      let index: number; //TS does not provide support for types in for..of loops
      for (index = 0; index < points.length; index++) {
        point = points[index];
        if (point.player == this.fight.aka) {
          this.akaPoints.push(point);
        }
        else if (point.player == this.fight.shiro) {
          this.shiroPoints.push(point);
        }
      }
    });
    this.playerService.getPlayer(this.fight.aka).subscribe(result => this.akaPlayer = result);
    this.playerService.getPlayer(this.fight.shiro).subscribe(result => this.shiroPlayer = result);
  }

}

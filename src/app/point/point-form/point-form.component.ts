import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Player } from '../../player/player';
import { Point, PointType } from '../point';
import { PointService } from '../point.service';

@Component({
  selector: 'ippon-point-form',
  templateUrl: './point-form.component.html',
  styleUrls: ['./point-form.component.css']
})
export class PointFormComponent implements OnInit {
  @Input() akaPlayer: Player;
  @Input() shiroPlayer: Player;
  @Input() fightId: number;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private pointService: PointService) { }
  pointType: PointType;

  ngOnInit() {
  }

  addPoint(player: Player): void {
    let point: Point = {
      type: this.pointType,
      playerId: player.id,
      fightId: this.fightId,
      id: 0
    }
    this.pointService.addPoint(point).subscribe(() => {
      this.reloadRequest.emit('');
    });
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Player } from '../../player/player';
import { Point, PointType } from '../point';
import { PointService } from '../point.service';

@Component({
  selector: 'ippon-point-line',
  templateUrl: './point-line.component.html',
  styleUrls: ['./point-line.component.css']
})
export class PointLineComponent implements OnInit {
  @Input() akaPlayer: Player;
  @Input() shiroPlayer: Player;
  @Input() point: Point;
  @Output() reloadRequest = new EventEmitter<any>();
  @Input() isAuthorized: boolean;

  constructor(private pointService: PointService) { }

  ngOnInit() {
  }

  deletePoint(): void {
    this.pointService.delete(this.point)
      .subscribe(resp => this.reloadRequest.emit(''));
  }

}

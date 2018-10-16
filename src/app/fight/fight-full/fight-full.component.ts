import { Component, OnInit, Input } from '@angular/core';
import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player';
import { PointService } from '../../point/point.service';
import { Point } from '../../point/point';
import { Fight } from '../fight';
import { FightService } from '../fight.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ippon-fight-full',
  templateUrl: './fight-full.component.html',
  styleUrls: ['./fight-full.component.css']
})
export class FightFullComponent implements OnInit {
  fight: Fight;
  akaPlayer: Player;
  shiroPlayer: Player;
  points: Point[];
  isAdmin: boolean;
  constructor(
    private playerService: PlayerService,
    private pointService: PointService,
    private fightService: FightService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.fightService.get(id).subscribe(response => {
      this.fight = response;
      this.loadPointsAndPlayers();
    });
    this.isAdmin = false;
    this.fightService.isAuthorized(id).subscribe(isAuthorized => this.isAdmin = isAuthorized);
  }

  private loadPointsAndPlayers() {
    this.playerService.getPlayer(this.fight.aka).subscribe(resp => this.akaPlayer = resp);
    this.playerService.getPlayer(this.fight.shiro).subscribe(resp => this.shiroPlayer = resp);
    this.loadPoints();
  }

  private loadPoints() {
    this.pointService.getList(this.fight.id).subscribe(resp => this.points = resp);
  }

  reload(): void {
    this.loadPoints();
  }
}

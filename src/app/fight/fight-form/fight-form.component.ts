import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../player/player';
import { Fight } from '../fight';
import { FightService } from '../fight.service';
import { Point } from '../../point/point';

@Component({
  selector: 'ippon-fight-form',
  templateUrl: './fight-form.component.html',
  styleUrls: ['./fight-form.component.css']
})
export class FightFormComponent implements OnInit {
  @Input() shiroPlayers: Player[];
  @Input() akaPlayers: Player[];
  @Input() teamFight: number;
  @Output() reloadRequest = new EventEmitter<any>();
  fight: Fight;
  constructor(private fightService: FightService) { }

  ngOnInit() {
    this.fight = new Fight();
  }

  private fillFight() {
    this.fight.id = 0;
    this.fight.team_fight = this.teamFight;
    this.fight.points = [];
    this.fight.orderingNumber = 0;
  }

  save(): void {
    this.fillFight();
    this.fightService.add(this.fight).subscribe(resp => {
      this.reloadRequest.emit('');
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupPhaseService } from '../cup-phase.service';
import { CupPhase } from '../cup-phase';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { CupFight } from '../../cup-fight/cup-fight';
import { PlannedPosition } from '../planned-position';


@Component({
  selector: 'ippon-cup-phase-full',
  templateUrl: './cup-phase-full.component.html',
  styleUrls: ['./cup-phase-full.component.css']
})
export class CupPhaseFullComponent implements OnInit {
  cupPhase: CupPhase;
  cupFights: CupFight[] = [];
  isAuthorized: boolean = false;
  final: CupFight;
  akaFights: CupFight[][] = [];
  shiroFights: CupFight[][] = [];
  fightMap: Map<number, CupFight>;
  plannedPositions: PlannedPosition[] = [];
  constructor(private route: ActivatedRoute,
    private cupPhaseService: CupPhaseService,
    private cupFightService: CupFightService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cupPhaseService.get(id).subscribe(resp => {
      this.cupPhase = resp;
      this.loadCupFights();
    });
    this.cupPhaseService.isAuthorized(id).subscribe((resp: boolean) => this.isAuthorized = resp);
    this.cupPhaseService.getPlannedPositions(id).subscribe((resp: PlannedPosition[]) => this.plannedPositions = resp);
  }

  private loadCupFights() {
    this.cupFightService.getList(this.cupPhase.id).subscribe((resp: CupFight[]) => {
      this.cupFights = resp;
      if (this.cupFights.length > 0)
        this.buildCup();
    }, this.handleError);
  }

  buildCup(): void {
    this.findFinalFight();
    this.akaFights = [];
    this.shiroFights = [];
    this.findAncestorFights(this.final.previous_aka_fight, 0, this.akaFights);
    this.findAncestorFights(this.final.previous_shiro_fight, 0, this.shiroFights);
  }

  private findAncestorFights(id: number, level: number, fights: CupFight[][]): void {
    if (fights.length <= level)
      fights.push([]);
    if (null != id) {
      let currentFight: CupFight = this.fightMap.get(id);
      fights[level].push(currentFight);
      if (null != currentFight.previous_aka_fight && null != currentFight.previous_shiro_fight) {
        this.findAncestorFights(currentFight.previous_aka_fight, level + 1, fights);
        this.findAncestorFights(currentFight.previous_shiro_fight, level + 1, fights);
      }
    }
  }

  private findFinalFight() {
    this.fightMap = new Map<number, CupFight>();
    this.cupFights.forEach((fight: CupFight) => {
      this.fightMap.set(fight.id, fight);
    });
    let ids: Number[] = Array.from(this.fightMap.keys());
    this.fightMap.forEach((fight: CupFight) => {
      if (fight.previous_aka_fight != null && fight.previous_shiro_fight != null) {
        [fight.previous_aka_fight, fight.previous_shiro_fight].forEach(() => {
          removeIfPresent(ids, fight.previous_aka_fight);
          removeIfPresent(ids, fight.previous_shiro_fight);
        });
      }
    });
    if (ids.length == 1) {
      this.final = this.fightMap.get(ids[0].valueOf());
    } else {
      console.log(ids);
      console.log(this.cupFights);
    }
  }

  handleError(arg): void {
    console.log(arg);
  }
}
function removeIfPresent(ids: Number[], previousFight: number) {
  let index: number = ids.lastIndexOf(previousFight);
  if (index >= 0)
    ids.splice(index, 1);
}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupPhaseService } from '../cup-phase.service';
import { CupPhase } from '../cup-phase';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { CupFight } from '../../cup-fight/cup-fight';
import { Team } from '../../team/team';
import { TeamService } from '../../team/team.service';
import { TeamFight } from '../../team-fight/team-fight';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

class TeamId {
  id: number = 0;
}

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
  }

  private loadCupFights() {
    this.cupFightService.getList(this.cupPhase.id).subscribe((resp: CupFight[]) => {
      this.cupFights = resp;
      this.buildCup();
    }, this.handleError);
  }

  buildCup(): void {
    this.findFinalFight();
  }

  private findFinalFight() {
    let fightMap: Map<number, CupFight> = new Map<number, CupFight>();
    this.cupFights.forEach((fight: CupFight) => {
      fightMap.set(fight.id, fight);
    });
    let ids: Number[] = Array.from(fightMap.keys());
    fightMap.forEach((fight: CupFight) => {
      if (fight.previous_aka_fight != null && fight.previous_shiro_fight != null) {
        [fight.previous_aka_fight, fight.previous_shiro_fight].forEach((id: number) => {
          let index: number = ids.lastIndexOf(fight.previous_aka_fight);
          if (index >= 0)
            ids.splice(index, 1);
        });
      }
    });
    if (ids.length > 0) {
      this.final = fightMap.get(ids[0].valueOf());
    }
  }

  handleError(arg): void {
    console.log(arg);
  }
}

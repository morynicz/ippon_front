import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { TeamFightService } from '../../team-fight/team-fight.service';
import { TeamService } from '../../team/team.service';
import { CupPhase } from '../cup-phase';
import { CupFight } from '../../cup-fight/cup-fight';
import { TeamFight } from '../../team-fight/team-fight';
import { Team } from '../../team/team';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';

class TeamId {
  id: number = 0;
}

@Component({
  selector: 'ippon-cup-creation',
  templateUrl: './cup-creation.component.html',
  styleUrls: ['./cup-creation.component.css']
})
export class CupCreationComponent implements OnInit {
  @Input() cupPhase: CupPhase;
  @Input() cupFights: CupFight[];
  @Output() reloadRequest = new EventEmitter<any>();
  teamFights: TeamFight[] = [];
  availableTeams: Team[] = [];
  teamSelections: TeamId[] = [];
  final: CupFight;
  constructor(
    private cupFightService: CupFightService,
    private teamFightService: TeamFightService,
    private teamService: TeamService) { }

  ngOnInit() {
    this.reloadTeams();
    this.generateTeamSelections();
  }

  reloadTeams(): void {
    this.teamService.getList(this.cupPhase.tournament).subscribe(
      (resp: Team[]) => {
        this.availableTeams = resp;
      },
      this.handleError);
  }

  generateCup(): void {
    let selectedTeamPairs: number[][]
      = this.teamSelections.concat()
        .map((teamId: TeamId) => teamId.id)
        .reduce((result, value, index, array) => {
          if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
          return result;
        }, []);
    forkJoin(selectedTeamPairs.map((item: number[]) => {
      return this.teamFightService.add({
        aka_team: item[0],
        shiro_team: item[1],
        tournament: this.cupPhase.tournament,
        id: 0,
        shiro_score: 0,
        aka_score: 0,
        status: FightStatus.Prepared,
        winner: FightWinner.None
      }).pipe(mergeMap<TeamFight, Observable<CupFight>>((resp: TeamFight) => {
        let teamFight: TeamFight = resp;
        return this.cupFightService.add({
          id: 0,
          team_fight: teamFight.id,
          previous_aka_fight: null,
          previous_shiro_fight: null,
          cup_phase: this.cupPhase.id
        });
      }));
    })).subscribe((result: CupFight[]) => this.buildNextTreeLevel(result, this.cupFightService));
  }

  buildNextTreeLevel(cupFights: CupFight[], cupFightService: CupFightService): void {
    if (cupFights.length > 1) {
      let reduced: CupFight[][] = cupFights.reduce((result, value, index, array) => {
        if (index % 2 === 0)
          result.push(array.slice(index, index + 2));
        return result;
      }, []);
      forkJoin(reduced.map((cupFightPair: CupFight[]) => {
        return cupFightService.add({
          id: 0,
          team_fight: null,
          previous_aka_fight: cupFightPair[0].id,
          previous_shiro_fight: cupFightPair[1].id,
          cup_phase: this.cupPhase.id
        });
      })).subscribe((result: CupFight[]) => this.buildNextTreeLevel(result, this.cupFightService));
    } else {
      this.reloadTeams();
      this.reloadRequest.emit();
    }
  }

  generateTeamSelections(): void {
    this.teamSelections = new Array<TeamId>();
    for (let i = 0; i < this.cupPhase.number_of_positions; ++i)
      this.teamSelections.push(new TeamId());
  }

  deleteCup(): void {
    forkJoin(this.cupFights
      .map((cupFight: CupFight) => this.cupFightService.delete(cupFight)))
      .subscribe(() => this.reloadRequest.emit());
  }

  handleError(arg): void {
    console.log(arg);
  }
}

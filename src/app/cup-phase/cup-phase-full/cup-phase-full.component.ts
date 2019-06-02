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
import { Observable } from 'rxjs';

class TeamSelection {
  constructor(team: Team) { this.team = team; }
  position: number = 0;
  team: Team;
}

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
  teamFights: TeamFight[] = [];
  availableTeams: Team[] = [];
  teamSelections: TeamId[] = [];
  numberOfTeams: number = 0;
  constructor(private route: ActivatedRoute,
    private cupPhaseService: CupPhaseService,
    private cupFightService: CupFightService,
    private teamFightService: TeamFightService,
    private teamService: TeamService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cupPhaseService.get(id).subscribe(resp => {
      this.cupPhase = resp;
      this.reloadTeams();
      this.loadCupFights();
    });
  }

  private loadCupFights() {
    this.cupFightService.getList(this.cupPhase.id).subscribe((resp: CupFight[]) => {
      this.cupFights = resp;
    }, this.handleError);
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
    this.teamFightService.add({
      aka_team: selectedTeamPairs[0][0],
      shiro_team: selectedTeamPairs[0][1],
      tournament: this.cupPhase.tournament,
      id: 0
    }).pipe(mergeMap<TeamFight, Observable<CupFight>>((resp: TeamFight) => {
      let teamFight: TeamFight = resp;
      return this.cupFightService.add({
        id: 0,
        team_fight: teamFight.id,
        previous_aka_fight: null,
        previous_shiro_fight: null,
        cup_phase: this.cupPhase.id
      });
    })).subscribe(resp => {
      this.reloadTeams();
      this.loadCupFights();
    }, this.handleError);
  }

  onNumOfTeamsChange(): void {
    this.teamSelections = new Array<TeamId>();
    for (let i = 0; i < this.numberOfTeams; ++i)
      this.teamSelections.push(new TeamId());
  }

  deleteCup(): void {
    this.cupFights.forEach(cupFight => this.cupFightService.delete(cupFight).subscribe());
  }
  handleError(arg): void {
    console.log(arg);
  }
}

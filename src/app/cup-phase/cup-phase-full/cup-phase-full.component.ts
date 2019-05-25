import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CupPhaseService } from '../cup-phase.service';
import { CupPhase } from '../cup-phase';
import { CupFightService } from '../../cup-fight/cup-fight.service';
import { CupFight } from '../../cup-fight/cup-fight';
import { cupFights, teams } from './test-scaffolding';
import { Team } from '../../team/team';
import { TeamService } from '../../team/team.service';
import { TeamFight } from '../../team-fight/team-fight';
import { TeamFightService } from '../../team-fight/team-fight.service';

@Component({
  selector: 'ippon-cup-phase-full',
  templateUrl: './cup-phase-full.component.html',
  styleUrls: ['./cup-phase-full.component.css']
})
export class CupPhaseFullComponent implements OnInit {
  cupPhase: CupPhase;
  cupFights: CupFight[] = [];
  teamFights: TeamFight[] = [];
  teams: Team[] = [];
  constructor(private route: ActivatedRoute,
    private cupPhaseService: CupPhaseService,
    private cupFightService: CupFightService,
    private teamFightService: TeamFightService,
    private teamService: TeamService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cupPhaseService.get(id).subscribe(resp => this.cupPhase = resp);
    this.cupFightService.getList(id).subscribe(resp => this.cupFights = resp);
    cupFights.forEach(cupFight => {
      this.teamFightService.get(cupFight.team_fight).subscribe(resp => this.teamFights.push(resp));
    });
    this.teamFights.forEach(teamFight => {
      this.teamService.get(teamFight.aka_team).subscribe(resp => this.teams.push(resp));
      this.teamService.get(teamFight.shiro_team).subscribe(resp => this.teams.push(resp));
    });
  }

}

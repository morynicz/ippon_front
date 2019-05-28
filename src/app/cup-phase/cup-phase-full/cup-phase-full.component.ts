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

class TeamSelection {
  constructor(team: Team) { this.team = team; }
  isSelected: boolean = false;
  team: Team;
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
  teamSelections: TeamSelection[] = [];
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
    this.cupFightService.getList(this.cupPhase.id).subscribe(resp => {
      this.cupFights = resp;
    });
  }

  reloadTeams(): void {
    this.teamService.getList(this.cupPhase.tournament).subscribe(
      resp => {
        this.availableTeams = resp;
        this.availableTeams.forEach(team => {
          this.teamSelections.push(new TeamSelection(team));
        });
      },
      () => this.handleError());
  }

  generateCup(): void {
    let selectedTeams: Team[]
      = this.teamSelections.filter(selection => selection.isSelected)
        .map(selection => selection.team);
    let teamFight: TeamFight;
    this.teamFightService.add({
      aka_team: selectedTeams[0].id,
      shiro_team: selectedTeams[1].id,
      tournament: this.cupPhase.tournament,
      id: 0
    }).subscribe(resp => {
      teamFight = resp;
      this.cupFightService.add({
        id: 0,
        team_fight: teamFight.id,
        previous_aka_fight: null,
        previous_shiro_fight: null,
        cup_phase: this.cupPhase.id
      }).subscribe(resp => {
        this.reloadTeams();
        this.loadCupFights();
      });
    });
  }

  deleteCup(): void {
    this.cupFights.forEach(cupFight => this.cupFightService.delete(cupFight).subscribe());
  }
  handleError(): void {

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { GroupPhaseService } from '../group-phase.service';
import { GroupPhase } from '../group-phase';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'ippon-group-phase-management',
  templateUrl: './group-phase-management.component.html',
  styleUrls: ['./group-phase-management.component.css']
})
export class GroupPhaseManagementComponent implements OnInit {
  @Input() tournamentId: number;
  newGroupPhase: GroupPhase;
  groupPhases: GroupPhase[];
  isAdmin: boolean;
  constructor(
    private groupPhaseService: GroupPhaseService,
    private tournamentService: TournamentService) { }

  ngOnInit() {
    this.prepareNewGroupPhase();
    this.loadGroupPhases();
    this.loadAuthorization();
  }

  private prepareNewGroupPhase() {
    this.newGroupPhase = new GroupPhase();
    this.newGroupPhase.tournament = this.tournamentId;
  }

  private loadGroupPhases() {
    this.groupPhaseService.getList(this.tournamentId).subscribe(response => {
      this.groupPhases = response;
    }, () => this.handleError());
  }

  private loadAuthorization(): void {
    this.tournamentService.isAuthorized(this.tournamentId).subscribe(auth => {
      this.isAdmin = auth;
    }, () => this.handleError());
  }


  handleError(): void {

  }
}

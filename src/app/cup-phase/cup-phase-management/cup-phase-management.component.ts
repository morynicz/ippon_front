import { Component, OnInit, Input } from '@angular/core';
import { CupPhaseService } from '../cup-phase.service';
import { CupPhase } from '../cup-phase';
import { TournamentService } from '../../tournament/tournament.service';

@Component({
  selector: 'ippon-cup-phase-management',
  templateUrl: './cup-phase-management.component.html',
  styleUrls: ['./cup-phase-management.component.css']
})
export class CupPhaseManagementComponent implements OnInit {
  @Input() tournamentId: number;
  newCupPhase: CupPhase;
  cupPhases: CupPhase[];
  isAdmin: boolean;
  constructor(
    private cupPhaseService: CupPhaseService,
    private tournamentService: TournamentService) { }

  ngOnInit() {
    this.prepareNewCupPhase();
    this.loadCupPhases();
    this.loadAuthorization();
  }

  private prepareNewCupPhase() {
    this.newCupPhase = new CupPhase();
    this.newCupPhase.tournament = this.tournamentId;
  }

  private loadCupPhases() {
    this.cupPhaseService.getList(this.tournamentId).subscribe(response => {
      this.cupPhases = response;
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

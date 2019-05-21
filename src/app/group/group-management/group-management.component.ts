import { Component, OnInit, Input } from '@angular/core';
import { GroupPhaseService } from '../../group-phase/group-phase.service';
import { GroupPhase } from '../../group-phase/group-phase';

@Component({
  selector: 'ippon-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  @Input() tournamentId: number;
  newGroupPhase: GroupPhase;
  groupPhases: GroupPhase[];
  isAdmin: boolean;
  constructor(private groupPhaseService: GroupPhaseService) { }

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
    this.groupPhaseService.isAuthorized(this.tournamentId).subscribe(auth => {
      this.isAdmin = auth;
    }, () => this.handleError());
  }


  handleError(): void {

  }
}

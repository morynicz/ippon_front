import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CupPhase } from '../cup-phase';
import { CupPhaseService } from '../cup-phase.service';

@Component({
  selector: 'ippon-cup-phase-line',
  templateUrl: './cup-phase-line.component.html',
  styleUrls: ['./cup-phase-line.component.css']
})
export class CupPhaseLineComponent implements OnInit {

  @Input() cupPhase: CupPhase;
  @Input() isAuthorized: boolean;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private cupPhaseService: CupPhaseService) { }

  ngOnInit() {
  }

  deleteCupPhase(): void {
    this.cupPhaseService.delete(this.cupPhase)
      .subscribe(resp => this.reloadRequest.emit(''));
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CupPhase } from '../cup-phase';
import { CupPhaseService } from '../cup-phase.service';

@Component({
  selector: 'ippon-cup-phase-form',
  templateUrl: './cup-phase-form.component.html',
  styleUrls: ['./cup-phase-form.component.css']
})
export class CupPhaseFormComponent implements OnInit {
  @Input() cupPhase: CupPhase;
  @Output() reloadRequest: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cupPhaseService: CupPhaseService) { }

  ngOnInit() {
    if (this.cupPhase == undefined) {
      this.cupPhase = new CupPhase();
    }
  }

  save(): void {
    this.cupPhaseService.add(this.cupPhase).subscribe(
      () => this.reloadRequest.emit('')
    );
  }

}

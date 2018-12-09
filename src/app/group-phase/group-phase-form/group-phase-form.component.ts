import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupPhase } from '../group-phase';
import { GroupPhaseService } from '../group-phase.service';

@Component({
  selector: 'ippon-group-phase-form',
  templateUrl: './group-phase-form.component.html',
  styleUrls: ['./group-phase-form.component.css']
})
export class GroupPhaseFormComponent implements OnInit {
  @Input() groupPhase: GroupPhase;
  @Output() reloadRequest: EventEmitter<any> = new EventEmitter<any>();
  constructor(private groupPhaseService: GroupPhaseService) { }

  ngOnInit() {
    if (this.groupPhase == undefined) {
      this.groupPhase = new GroupPhase();
    }
  }

  save(): void {
    this.groupPhaseService.add(this.groupPhase).subscribe(
      () => this.reloadRequest.emit('')
    );
  }
}

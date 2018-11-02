import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroupPhase } from '../group-phase';
import { GroupPhaseService } from '../group-phase.service';

@Component({
  selector: 'ippon-group-phase-line',
  templateUrl: './group-phase-line.component.html',
  styleUrls: ['./group-phase-line.component.css']
})
export class GroupPhaseLineComponent implements OnInit {
  @Input() groupPhase: GroupPhase;
  @Input() isAuthorized: boolean;
  @Output() reloadRequest = new EventEmitter<any>();

  constructor(private groupPhaseService: GroupPhaseService) { }

  ngOnInit() {
  }

  deleteGroupPhase(): void {
    this.groupPhaseService.delete(this.groupPhase)
      .subscribe(resp => this.reloadRequest.emit(''));
  }

}

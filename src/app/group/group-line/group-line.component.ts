import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'ippon-group-line',
  templateUrl: './group-line.component.html',
  styleUrls: ['./group-line.component.css']
})
export class GroupLineComponent implements OnInit {
  @Input() group: Group;
  @Input() isAuthorized: boolean;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }

  deleteGroup(): void {
    this.groupService.delete(this.group).subscribe(
      response => this.reloadRequest.emit('')
    );
  }

}

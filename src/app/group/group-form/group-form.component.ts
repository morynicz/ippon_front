import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'ippon-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @Input() group: Group;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private groupService: GroupService) {
    if(this.group == undefined){
      this.group = new Group();
    }

   }

  ngOnInit() {
    if(this.group == undefined){
      this.group = new Group();
    }
  }

  save(): void {
    this.groupService.add(this.group).subscribe(
      response => this.reloadRequest.emit('')
    )
  }
}

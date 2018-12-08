import { Component, OnInit } from '@angular/core';
import { GroupPhase } from '../group-phase';
import { GroupPhaseService } from '../group-phase.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../group/group';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'ippon-group-phase-full',
  templateUrl: './group-phase-full.component.html',
  styleUrls: ['./group-phase-full.component.css']
})
export class GroupPhaseFullComponent implements OnInit {
  groupPhase: GroupPhase = new GroupPhase();
  groups: Group[];
  newGroup: Group = new Group();
  isAuthorized: boolean = false;
  constructor(
    private groupPhaseService: GroupPhaseService,
    private groupService: GroupService,
    private route: ActivatedRoute) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.groupPhaseService.get(id).subscribe(
        response => this.groupPhase = response
      );
      this.loadGroups(id);
      this.groupPhaseService.isAuthorized(id).subscribe(
        response => this.isAuthorized = response
      );
     }

  private loadGroups(id: number) {
    this.groupService.getList(id).subscribe(response => this.groups = response);
  }

  ngOnInit() {
  }

  onGroupDeletion(): void {
    this.loadGroups(this.groupPhase.id);
  }

  onGroupCreation(): void {
    this.loadGroups(this.groupPhase.id);
    this.newGroup = new Group();
    this.newGroup.group_phase = this.groupPhase.id;
    this.newGroup.id = 0;
  }
}

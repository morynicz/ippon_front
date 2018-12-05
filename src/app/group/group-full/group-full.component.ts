import { Component, OnInit } from '@angular/core';
import { GroupMemberService } from '../group-member.service';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../../team/team';

@Component({
  selector: 'ippon-group-full',
  templateUrl: './group-full.component.html',
  styleUrls: ['./group-full.component.css']
})
export class GroupFullComponent implements OnInit {
  teams: Team[];
  constructor(private route: ActivatedRoute,
    private groupMemberService: GroupMemberService) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.groupMemberService.getList(id).subscribe(
      resp => this.teams = resp
    );
  }

  ngOnInit() {
  }

}

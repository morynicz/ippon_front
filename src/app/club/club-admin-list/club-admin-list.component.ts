import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClubAdminFormComponent } from '../club-admin-form/club-admin-form.component';
import { ClubAdminService } from '../club-admin.service';
import { ClubAdmin } from '../club-admin';
import { User } from '../../user';


@Component({
  selector: 'ippon-club-admin-list',
  templateUrl: './club-admin-list.component.html',
  styleUrls: ['./club-admin-list.component.css']
})
export class ClubAdminListComponent implements OnInit {
  admins: ClubAdmin[];
  nonAdmins: User[];
  clubId: number;
  constructor(
    private adminService: ClubAdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.clubId = +this.route.snapshot.paramMap.get('id');
    this.reload();
  }

  reload(): void {
    this.adminService.getAdmins(this.clubId)
      .subscribe(admins => this.admins = admins);
    this.adminService.getNonAdmins(this.clubId)
      .subscribe(nonAdmins => this.nonAdmins = nonAdmins);
  }

  addAdmin(user: User): void {
    let admin: ClubAdmin = {
      club_id: this.clubId,
      user: user,
      id: -1
    }
    this.adminService.addAdmin(admin).subscribe(response => this.reload());
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ClubAdminService } from '../club-admin.service';
import { ClubAdmin } from '../club-admin';

@Component({
  selector: 'ippon-club-admin-form',
  templateUrl: './club-admin-form.component.html',
  styleUrls: ['./club-admin-form.component.css']
})
export class ClubAdminFormComponent implements OnInit {
  @Input() admin: ClubAdmin;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private adminService: ClubAdminService) { }

  ngOnInit() {
  }

  delete(): void {
    this.adminService.deleteAdmin(this.admin.id)
      .subscribe(resp => this.reloadRequest.emit(''));
  }

}

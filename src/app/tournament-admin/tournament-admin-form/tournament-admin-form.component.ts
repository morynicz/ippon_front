import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TournamentAdmin } from '../tournament-admin';
import { TournamentAdminService } from '../tournament-admin.service';

@Component({
  selector: 'ippon-tournament-admin-form',
  templateUrl: './tournament-admin-form.component.html',
  styleUrls: ['./tournament-admin-form.component.css']
})
export class TournamentAdminFormComponent implements OnInit {
  @Input() admin: TournamentAdmin;
  @Output() reloadRequest = new EventEmitter<any>();
  constructor(private adminService: TournamentAdminService) { }

  ngOnInit() {
  }

  save(): void {
    this.adminService.updateAdmin(this.admin)
      .subscribe(resp => this.admin = resp);
  }

  delete(): void {
    this.adminService.deleteAdmin(this.admin.id)
      .subscribe(resp => this.reloadRequest.emit(''));
  }

}

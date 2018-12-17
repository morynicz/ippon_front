import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TournamentAdminFormComponent } from '../tournament-admin-form/tournament-admin-form.component';
import { TournamentAdminService } from '../tournament-admin.service';
import { TournamentAdmin } from '../tournament-admin';
import { User } from '../../user';


@Component({
  selector: 'ippon-tournament-admin-list',
  templateUrl: './tournament-admin-list.component.html',
  styleUrls: ['./tournament-admin-list.component.css']
})
export class TournamentAdminListComponent implements OnInit {
  admins: TournamentAdmin[];
  nonAdmins: User[];
  tournamentId: number;
  constructor(
    private adminService: TournamentAdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tournamentId = +this.route.snapshot.paramMap.get('id');
    this.reload();
  }

  reload(): void {
    this.adminService.getAdmins(this.tournamentId)
      .subscribe(admins => this.admins = admins);
    this.adminService.getNonAdmins(this.tournamentId)
      .subscribe(nonAdmins => this.nonAdmins = nonAdmins);
  }

  addAdmin(user: User): void {
    let admin: TournamentAdmin = {
      id: 0,
      tournament_id: this.tournamentId,
      user: user,
      is_master: false
    };
    this.adminService.addAdmin(admin).subscribe(response => this.reload());
  }

}

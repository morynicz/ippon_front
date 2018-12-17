import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentAdminListComponent } from './tournament-admin-list.component';
import { TournamentAdminFormComponent } from '../tournament-admin-form/tournament-admin-form.component';
import { TournamentAdminService } from '../tournament-admin.service';
import { TournamentAdmin } from '../tournament-admin';
import { User } from '../../user';

const tournamentId: number = 4;

let admins: TournamentAdmin[] = [
  {
    id: 3,
    user: {
      id: 5,
      username: 'U5'
    },
    tournament_id: 7,
    is_master: true
  },
  {
    id: 4,
    user: {
      id: 7,
      username: 'U7'
    },
    tournament_id: 1,
    is_master: false
  }
];

let users: User[] = [
  {
    id: 2,
    username: 'U2'
  },
  {
    id: 7,
    username: 'U7'
  }
];

class TournamentAdminServiceSpy {
  getAdminsValue: number;
  getAdminsReturnValue: TournamentAdmin[];
  getAdmins(tournamentId: number): Observable<TournamentAdmin[]> {
    this.getAdminsValue = tournamentId;
    return of(this.getAdminsReturnValue);
  }

  getNonAdminsValue: number;
  getNonAdminsReturnValue: User[];
  getNonAdmins(tournamentId: number): Observable<User[]> {
    this.getNonAdminsValue = tournamentId;
    return of(this.getNonAdminsReturnValue);
  }

  addAdminValue: TournamentAdmin;
  addAdmin(admin: TournamentAdmin): Observable<TournamentAdmin> {
    this.addAdminValue = admin;
    return of(admin);
  }
}

describe('TournamentAdminListComponent', () => {
  let fixture: ComponentFixture<TournamentAdminListComponent>;
  let adminService: TournamentAdminServiceSpy;
  let html;

  beforeEach(async(() => {
    adminService = new TournamentAdminServiceSpy();
    adminService.getAdminsReturnValue = admins;
    adminService.getNonAdminsReturnValue = users;
    TestBed.configureTestingModule({
      declarations: [
        TournamentAdminListComponent,
        TournamentAdminFormComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: TournamentAdminService, useValue: adminService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: tournamentId })
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAdminListComponent);
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe('when created', () => {
    it('should call admins api to get admins for current tournament', () => {
      expect(adminService.getAdminsValue).toBe(tournamentId);
    });

    it("should display all admins it received", () => {
      expect(html.textContent).toContain('U5');
      expect(html.textContent).toContain('U7');
    });

    it("should display the users who can become admins", () => {
      let playersHtml = fixture.debugElement.query(By.css('#non_admins')).nativeElement;
      expect(playersHtml.textContent).toContain('U2');
      expect(playersHtml.textContent).toContain('U7');
    });

  });

  describe("when add participant button is pushed", () => {
    let newAdmin: TournamentAdmin;
    beforeEach(() => {
      newAdmin = {
        id: 5,
        user: {
          id: 2,
          username: 'U2'
        },
        tournament_id: tournamentId,
        is_master: false
      };

      let newAdmins: TournamentAdmin[] = [
        {
          id: 3,
          user: {
            id: 5,
            username: 'U5'
          },
          tournament_id: 7,
          is_master: true
        },
        {
          id: 4,
          user: {
            id: 7,
            username: 'U7'
          },
          tournament_id: 1,
          is_master: false
        },
        newAdmin
      ];

      let newUsers: User[] = [
        {
          id: 7,
          username: 'U7'
        }
      ];

      let userHtml = fixture.debugElement.query(By.css('#non_admins'));
      let buttons = userHtml.queryAll(By.css('#add-admin'));
      fixture.detectChanges();
      adminService.getAdminsReturnValue = newAdmins;
      adminService.getNonAdminsReturnValue = newUsers;
      buttons[0].nativeElement.click();
      fixture.detectChanges();
    });

    it('shold call the admins service with new admin', () => {
      expect(adminService.addAdminValue.tournament_id)
        .toBe(newAdmin.tournament_id);
      expect(adminService.addAdminValue.user)
        .toEqual(newAdmin.user);
    });

    it('shold show the new admin', () => {
      fixture.detectChanges();
      let adminsHtml = fixture.debugElement.query(By.css('#admins')).nativeElement;
      expect(adminsHtml.textContent).toContain('U2');
    });

    it('should remove the participant from non-participant section', () => {
      fixture.detectChanges();
      let usersHtml = fixture.debugElement.query(By.css('#non_admins')).nativeElement;
      expect(usersHtml.textContent).not.toContain('U2');
      expect(usersHtml.textContent).toContain('U7');
    });
  });

  it("should have 'a go back to tournament' link-button", () => {
    let tournamentButton = fixture.debugElement.query(By.css("#back-to-tournament"));
    expect(tournamentButton.attributes['ng-reflect-router-link']).toBe('/tournament/' + tournamentId);
  });
});

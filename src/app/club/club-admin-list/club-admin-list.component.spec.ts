import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubAdminListComponent } from './club-admin-list.component';
import { ClubAdminFormComponent } from '../club-admin-form/club-admin-form.component';
import { ClubAdminService } from '../club-admin.service';
import { ClubAdmin } from '../club-admin';
import { User } from '../../user';

const clubId: number = 4;

let admins: ClubAdmin[] = [
  {
    id: 1,
    club_id: clubId,
    user: {
      id: 5,
      username: 'U5'
    }
  },
  {
    id: 2,
    club_id: clubId,
    user: {
      id: 7,
      username: 'U7'
    }
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

class ClubAdminServiceSpy {
  getAdminsValue: number;
  getAdminsReturnValue: ClubAdmin[];
  getAdmins(clubId: number): Observable<ClubAdmin[]> {
    this.getAdminsValue = clubId;
    return of(this.getAdminsReturnValue);
  }

  getNonAdminsValue: number;
  getNonAdminsReturnValue: User[];
  getNonAdmins(clubId: number): Observable<User[]> {
    this.getNonAdminsValue = clubId;
    return of(this.getNonAdminsReturnValue);
  }

  addAdminValue: ClubAdmin;
  addAdmin(admin: ClubAdmin): Observable<ClubAdmin> {
    this.addAdminValue = admin;
    return of(admin);
  }
}

describe('ClubAdminListComponent', () => {
  let component: ClubAdminListComponent;
  let fixture: ComponentFixture<ClubAdminListComponent>;
  let adminService: ClubAdminServiceSpy;
  let html;

  beforeEach(async(() => {
    adminService = new ClubAdminServiceSpy();
    adminService.getAdminsReturnValue = admins;
    adminService.getNonAdminsReturnValue = users;
    TestBed.configureTestingModule({
      declarations: [
        ClubAdminListComponent,
        ClubAdminFormComponent
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ClubAdminService, useValue: adminService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: clubId })
            }
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe('when created', () => {
    it('should call admins api to get admins for current club', () => {
      expect(adminService.getAdminsValue).toBe(clubId);
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

  describe("when add admin button is pushed", () => {
    let btn;
    let newAdmin: ClubAdmin;
    beforeEach(() => {
      newAdmin = {
        id: 2,
        club_id: clubId,
        user: {
          id: 2,
          username: 'U2'
        }
      };

      let newAdmins: ClubAdmin[] = [
        {
          id: 5,
          club_id: clubId,
          user: {
            id: 5,
            username: 'U5'
          }
        },
        {
          id: 7,
          club_id: clubId,
          user: {

            id: 7,
            username: 'U7'
          }
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
      expect(adminService.addAdminValue.club_id)
        .toEqual(newAdmin.club_id);
      expect(adminService.addAdminValue.user.id)
        .toEqual(newAdmin.user.id);
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

  it("should have 'a go back to club' link-button", () => {
    let clubButton = fixture.debugElement.query(By.css("#back-to-club"));
    expect(clubButton.attributes['ng-reflect-router-link']).toBe('/club/' + clubId);
  });
});

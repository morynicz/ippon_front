import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubAdminFormComponent } from './club-admin-form.component';

import { ClubAdminService } from '../club-admin.service';
import { ClubAdmin } from '../club-admin';

import { User } from '../../user';


let admin: ClubAdmin = {
  id: 5,
  club_id: 3,
  user: {
    id: 2,
    username: 'U5'
  }
};

class ClubAdminServiceSpy {
  deleteAdminValue: number;
  deleteAdmin(id: number): Observable<{}> {
    this.deleteAdminValue = id;
    return of({});
  }
}

describe('ClubAdminFormComponent', () => {
  let component: ClubAdminFormComponent;
  let fixture: ComponentFixture<ClubAdminFormComponent>;
  let adminService: ClubAdminServiceSpy;
  let html;

  beforeEach(async(() => {
    adminService = new ClubAdminServiceSpy();
    TestBed.configureTestingModule({
      declarations: [ClubAdminFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: ClubAdminService, useValue: adminService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubAdminFormComponent);
    component = fixture.componentInstance;
    component.admin = admin;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe("When component is created", () => {
    it("should display user name", () => {
      expect(html.textContent).toContain(admin.user.username);
    });
  });

  describe("when delete button is clicked", () => {
    let btn;
    let requested: boolean;
    beforeEach(async(() => {
      component.admin = admin;
      requested = false;
      fixture.detectChanges();
      component.reloadRequest.subscribe(req => {
        requested = true;
      });
      btn = fixture.debugElement.query(By.css("#delete-admin"));
      btn.nativeElement.click();
    }));
    it("should call admin service delete with set admin", () => {
      fixture.whenStable().then(() => {
        expect(adminService.deleteAdminValue).toBe(admin.id);
      });
    });
    it("should request reloading admins",
      async(() => {
        fixture.whenStable().then(() => {
          expect(requested).toBe(true);
        });
      }));
  });
});

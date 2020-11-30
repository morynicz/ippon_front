import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TournamentAdminFormComponent } from './tournament-admin-form.component';

import { TournamentAdminService } from '../tournament-admin.service';
import { TournamentAdmin } from '../tournament-admin';


let admin: TournamentAdmin = {
  id: 3,
  user: {
    id: 5,
    username: 'U5'
  },
  tournament_id: 7,
  is_master: true
};

let admin2: TournamentAdmin = {
  id: 4,
  user: {
    id: 7,
    username: 'U8'
  },
  tournament_id: 1,
  is_master: false
};

class TournamentAdminServiceSpy {
  updateAdminValue: TournamentAdmin;
  updateAdminReturnValue: TournamentAdmin;
  updateAdmin(admin: TournamentAdmin): Observable<TournamentAdmin> {
    this.updateAdminValue = admin;
    return of(this.updateAdminReturnValue);
  }

  deleteAdminValue: number;
  deleteAdmin(id: number): Observable<{}> {
    this.deleteAdminValue = id;
    return of({});
  }
}

describe('TournamentAdminFormComponent', () => {
  let component: TournamentAdminFormComponent;
  let fixture: ComponentFixture<TournamentAdminFormComponent>;
  let adminService: TournamentAdminServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    adminService = new TournamentAdminServiceSpy();
    adminService.updateAdminReturnValue = admin2;
    TestBed.configureTestingModule({
      declarations: [TournamentAdminFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: TournamentAdminService, useValue: adminService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAdminFormComponent);
    component = fixture.componentInstance;
    component.admin = admin;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe("When component is created", () => {
    it("should display user name", () => {
      expect(html.textContent).toContain(admin.user.username);
    });

    it("should have paid checkbox set to true", (done) => {
      fixture.whenStable().then(() => {
        let de = fixture.debugElement;
        expect(de.query(By.css('[name=is_master]')).nativeElement.checked).toBe(true);
        done();
      });
    });
  });

  describe("when update button is clicked", () => {
    let btn;
    beforeEach(waitForAsync(() => {
      component.admin = admin;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#save-admin"));
      btn.nativeElement.click();
    }));
    it("should call admin service update with set admin", () => {
      expect(adminService.updateAdminValue).toBe(admin);
    });
    it("should set the admin to value returned from update call",
      () => {
        expect(component.admin).toBe(admin2);
      });
  });

  describe("when delete button is clicked", () => {
    let btn;
    let requested: boolean;
    beforeEach(waitForAsync(() => {
      component.admin = admin;
      requested = false;
      fixture.detectChanges();
      component.reloadRequest.subscribe(() => {
        requested = true;
      });
      btn = fixture.debugElement.query(By.css("#delete-admin"));
      btn.nativeElement.click();
    }));
    it("should call admin service delete with set admin", () => {
      expect(adminService.deleteAdminValue).toBe(admin.id);
    });
    it("should request reloading admins",
      waitForAsync(() => {
        expect(requested).toBe(true);
      }));
  });
});

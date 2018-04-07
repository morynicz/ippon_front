import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ClubFormComponent } from './club-form.component';
import { ClubService } from '../club.service';
import { Club } from '../club'

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const clubId: number = 1;

class ClubServiceSpy {
  id: number = -1;
  club: Club = {
    id: clubId,
    name: 'C4',
    description: 'D',
    city: 'Ci',
    webpage: 'W'
  }
  addClubValue: Club;
  updateClubValue: Club;

  getClub(id: number) {
    this.id = id;
    return of(this.club);
  }

  addClub(club: Club): Observable<Club> {
    this.addClubValue = club;
    return of(club);
  }

  updateClub(club: Club): Observable<Club> {
    this.updateClubValue = club;
    return of(club);
  }
}

class LocationSpy {
  clicked: boolean = false;
  back(): void {
    this.clicked = true;
  }
}

function expectClubsToBeEqual(
  value: Club,
  expected: Club
) {
  expect(value.city).toBe(expected.city);
  expect(value.description).toBe(expected.description);
  expect(value.webpage).toBe(expected.webpage);
  expect(value.name).toBe(expected.name);
}

function setInput(
  name: string,
  value: string,
  fixture: ComponentFixture<ClubFormComponent>): void {
  const input = fixture.debugElement.query(By.css('[name="' + name + '"]'));
  input.nativeElement.value = value;
  input.nativeElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

function fillForm(club: Club, fixture: ComponentFixture<ClubFormComponent>): void {
  setInput('name', club.name, fixture);
  setInput('description', club.description, fixture);
  setInput('webpage', club.webpage, fixture);
  setInput('city', club.city, fixture);
}

describe('ClubFormComponent', () => {
  let component: ClubFormComponent;
  let fixture: ComponentFixture<ClubFormComponent>;
  let clubService: ClubServiceSpy;
  let el: HTMLElement;
  let location: LocationSpy;

  describe('when clubId is available', () => {
    beforeEach(async(() => {
      clubService = new ClubServiceSpy();
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [ClubFormComponent],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: ClubService, useValue: clubService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: clubId })
              }
            }
          },
          { provide: Location, useValue: location }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ClubFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load values of club with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=name]")).nativeElement.value)
            .toContain(clubService.club.name);
          expect(de.query(By.css("[name=city]")).nativeElement.value)
            .toContain(clubService.club.city);
          expect(de.query(By.css("[name=description]")).nativeElement.value)
            .toContain(clubService.club.description);
          expect(de.query(By.css("[name=webpage]")).nativeElement.value)
            .toContain(clubService.club.webpage);
        });
      }));

    describe('when form is filled out and submit clicked',
      () => {
        let expectedClub: Club = {
          id: clubId,
          name: 'bbbbbbb',
          description: 'ddddddd',
          city: 'ccccccc',
          webpage: 'wwwwwww',
        };
        let btn;
        beforeEach(async(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-club"));
        }));
        it('should call club service updateClub with club values set in form',
          async(() => {
            fillForm(expectedClub, fixture);
            btn.nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
              expectClubsToBeEqual(clubService.updateClubValue, expectedClub);
            });
          }));
        it('should go back to previous location', async(() => {
          fillForm(expectedClub, fixture);
          btn.nativeElement.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(location.clicked).toBeTruthy();
          });
        }));
      });
  });

  describe('when clubId is not available', () => {
    beforeEach(async(() => {
      clubService = new ClubServiceSpy();
      TestBed.configureTestingModule({
        declarations: [ClubFormComponent],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: ClubService, useValue: clubService },
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ClubFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not load any values',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=name]")).nativeElement.value)
            .toBe("");
          expect(de.query(By.css("[name=city]")).nativeElement.value)
            .toBe("");
          expect(de.query(By.css("[name=description]")).nativeElement.value)
            .toBe("");
          expect(de.query(By.css("[name=webpage]")).nativeElement.value)
            .toBe("");
        });
      }));

    describe('when form is filled out and submit clicked', () => {
      let expectedClub: Club = {
        id: clubId,
        name: 'bbbbbbb',
        description: 'ddddddd',
        city: 'ccccccc',
        webpage: 'wwwwwww',
      };
      let btn;
      beforeEach(async(() => {
        fixture.detectChanges();
        btn = fixture.debugElement.query(By.css("#save-club"));
      }));
      it('should call club service addClub with club values set in form',
        async(() => {
          fixture.whenStable().then(() => {
            fillForm(expectedClub, fixture);
            btn.nativeElement.click();
            fixture.detectChanges();
            expectClubsToBeEqual(clubService.addClubValue, expectedClub);
          });
        }));
      it('should go back to previous location', async(() => {
        fillForm(expectedClub, fixture);
        btn.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(location.clicked).toBeTruthy();
        });
      }));
    });
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { ClubFormComponent } from './club-form.component';
import { ClubService } from '../club.service';
import { Club } from '../club'

import { ClubServiceSpy } from '../club.service.spy';
import { LocationSpy } from '../../test-utils/location.spy';

const clubId: number = 1;
const club: Club = {
  id: clubId,
  name: 'C4',
  description: 'D',
  city: 'Ci',
  webpage: 'W'
};

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
  let location: LocationSpy;

  describe('when clubId is available', () => {
    beforeEach(waitForAsync(() => {
      clubService = new ClubServiceSpy();
      clubService.getReturnValues.push(club);
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
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=name]")).nativeElement.value)
            .toContain(club.name);
          expect(de.query(By.css("[name=city]")).nativeElement.value)
            .toContain(club.city);
          expect(de.query(By.css("[name=description]")).nativeElement.value)
            .toContain(club.description);
          expect(de.query(By.css("[name=webpage]")).nativeElement.value)
            .toContain(club.webpage);
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
        beforeEach(waitForAsync(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-club"));
        }));
        it('should call club service updateClub with club values set in form',
          waitForAsync(() => {
            fillForm(expectedClub, fixture);
            btn.nativeElement.click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
              expectClubsToBeEqual(clubService.updateValue, expectedClub);
            });
          }));
        it('should go back to previous location', waitForAsync(() => {
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
    beforeEach(waitForAsync(() => {
      clubService = new ClubServiceSpy();
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [ClubFormComponent],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: ClubService, useValue: clubService },
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

    it('should not load any values',
      waitForAsync(() => {
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
      beforeEach(waitForAsync(() => {
        fixture.detectChanges();
        btn = fixture.debugElement.query(By.css("#save-club"));
        component.club = expectedClub;
        fixture.detectChanges();
      }));
      it('should call club service addClub with club values set in form',
        waitForAsync(() => {
          fixture.whenStable().then(() => {
            btn.nativeElement.click();
            fixture.detectChanges();
            expectClubsToBeEqual(clubService.addValue, expectedClub);
          });
        }));
      it('should go back to previous location', waitForAsync(() => {
        btn.nativeElement.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(location.clicked).toBeTruthy();
        });
      }));
    });
  });
});

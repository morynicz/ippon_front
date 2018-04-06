import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';

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

describe('ClubFormComponent', () => {
  let component: ClubFormComponent;
  let fixture: ComponentFixture<ClubFormComponent>;
  let clubService: ClubServiceSpy;
  let el: HTMLElement;

  describe('when clubId is available', () => {
    beforeEach(async(() => {
      clubService = new ClubServiceSpy();
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
          }]
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

    it('should call club service updateClub with club values set in form',
      async(() => {
        fixture.whenStable().then(() => {
          let name = 'bbbbbbb';
          let city = 'ccccccc';
          let webpage = 'wwwwwww';
          let description = 'ddddddd';
          setInput('name', name, fixture);
          setInput('description', description, fixture);
          setInput('webpage', webpage, fixture);
          setInput('city', city, fixture);
          let btn = fixture.debugElement.query(By.css("#save-club"));
          btn.nativeElement.click();
          let expectedClub: Club = {
            id: clubId,
            name: name,
            description: description,
            city: city,
            webpage: webpage,
          };
          expectClubsToBeEqual(clubService.updateClubValue, expectedClub);
        });
      }));
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

    it('should call club service addClub with club values set in form',
      async(() => {
        fixture.whenStable().then(() => {
          let name = 'bbbbbbb';
          let city = 'ccccccc';
          let webpage = 'wwwwwww';
          let description = 'ddddddd';
          setInput('name', name, fixture);
          setInput('description', description, fixture);
          setInput('webpage', webpage, fixture);
          setInput('city', city, fixture);
          let btn = fixture.debugElement.query(By.css("#save-club"));
          btn.nativeElement.click();
          let expectedClub: Club = {
            id: clubId,
            name: name,
            description: description,
            city: city,
            webpage: webpage,
          };
          expectClubsToBeEqual(clubService.addClubValue, expectedClub);
        });
      }));
  });
});

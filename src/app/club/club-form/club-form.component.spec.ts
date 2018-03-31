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

  addClub(club: Club) {
    this.addClubValue = club;
  }

  updateClub(club: Club) {
    this.updateClubValue = club;
  }
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

  it('should call club service with club values set in form',
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
        btn.triggerEventHandler('click', null);
        let expectedClub: Club = {
          id: clubId,
          name: name,
          description: description,
          city: city,
          webpage: webpage,
        };
        expect(clubService.updateClubValue.city).toBe(city);
        expect(clubService.updateClubValue.description).toBe(description);
        expect(clubService.updateClubValue.webpage).toBe(webpage);
        expect(clubService.updateClubValue.name).toBe(name);
      });
    }));
});

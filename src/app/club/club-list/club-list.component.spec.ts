import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubListComponent } from './club-list.component';
import { ClubLineComponent } from './../club-line/club-line.component';
import { Club } from '../club';
import { ClubService } from './../club.service';

class ClubServiceSpy {
  getClubsCalled: boolean = false;
  getClubsResult: Club[];
  getClubs(): Observable<Club[]> {
    this.getClubsCalled = true;
    return of(this.getClubsResult);
  }
}

describe('ClubListComponent', () => {
  let component: ClubListComponent;
  let fixture: ComponentFixture<ClubListComponent>;
  let clubService: ClubServiceSpy;

  beforeEach(async(() => {
    clubService = new ClubServiceSpy();
    clubService.getClubsResult = [
      {
        id: 1,
        name: 'C1',
        description: 'D1',
        city: 'Ci1',
        webpage: 'W1'
      },
      {
        id: 2,
        name: 'C2',
        description: 'D2',
        city: 'Ci2',
        webpage: 'W2'
      }
    ];

    TestBed.configureTestingModule({
      declarations: [ClubListComponent, ClubLineComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ClubService, useValue: clubService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clubs using club.service.getClubs() on init', async(() => {
    fixture.whenStable().then(() => {
      expect(clubService.getClubsCalled).toBeTruthy();
    });
  }));

  it('should display loaded clubs', async(() => {
    fixture.whenStable().then(() => {
      const de = fixture.debugElement;
      const html = de.nativeElement;
      const clubLines = html.querySelectorAll('app-club-line');

      expect(clubLines[0].textContent).toContain('C1');
      expect(clubLines[0].textContent).toContain('Ci1');
      expect(clubLines[1].textContent).toContain('C2');
      expect(clubLines[1].textContent).toContain('Ci2');
    });
  }));
});

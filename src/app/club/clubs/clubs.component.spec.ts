import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubsComponent } from './clubs.component';
import { ClubLineComponent } from './../club-line/club-line.component';
import { Club } from '../club';
import { ClubService } from './../club.service';

describe('ClubsComponent', () => {
  let component: ClubsComponent;
  let fixture: ComponentFixture<ClubsComponent>;
  let clubServiceDummy;

  beforeEach(async(() => {
    clubServiceDummy = {
      getClubs(): Observable<Club[]> {
        return of([
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
        ])
      }
    }
    TestBed.configureTestingModule({
      declarations: [ClubsComponent, ClubLineComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ClubService, useValue: clubServiceDummy }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

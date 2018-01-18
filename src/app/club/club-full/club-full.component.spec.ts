import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';
import { Player } from '../../player/player';

class ClubServiceSpy {
  id: number;
  getClub(id: number): Observable<Club> {
    this.id = id;
    return new Observable<Club>();
  }
}

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useClass: ClubServiceSpy },
      ],
      imports: [RouterTestingModule],
      declarations: [ClubFullComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

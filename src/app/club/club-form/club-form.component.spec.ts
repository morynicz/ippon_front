import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';

import { ClubFormComponent } from './club-form.component';
import { ClubService } from '../club.service';
import { Club } from '../club'

class ClubServiceSpy {
  id: number;
  club: Club = {
    id: 1,
    name: 'C4',
    description: 'D',
    city: 'Ci',
    webpage: 'W'
  }
}

describe('ClubFormComponent', () => {
  let component: ClubFormComponent;
  let fixture: ComponentFixture<ClubFormComponent>;
  let clubServiceSpy: ClubServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubFormComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: ClubService, useValue: clubServiceSpy }]

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
});

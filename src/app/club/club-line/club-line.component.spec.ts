import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClubLineComponent } from './club-line.component';
import { Club } from '../club';

describe('ClubLineComponent', () => {
  let component: ClubLineComponent;
  let fixture: ComponentFixture<ClubLineComponent>;
  let expectedClub: Club;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClubLineComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubLineComponent);
    component = fixture.componentInstance;

    // el = fixture.debugElement.query(By.css('.club'));
    expectedClub = {
      id: 1,
      name: 'C1',
      description: 'D1',
      city: 'Ci1',
      webpage: 'W1'
    };
    component.club = expectedClub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

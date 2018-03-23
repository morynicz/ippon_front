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

  it('should display club name and city', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.textContent).toContain('C1');
    expect(html.textContent).toContain('Ci1');
  });
});

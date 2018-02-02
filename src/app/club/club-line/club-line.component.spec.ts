import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ClubLineComponent } from './club-line.component';
import { Club } from '../club';

describe('ClubLineComponent', () => {
  let component: ClubLineComponent;
  let fixture: ComponentFixture<ClubLineComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

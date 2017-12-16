import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubLineComponent } from './club-line.component';

describe('ClubLineComponent', () => {
  let component: ClubLineComponent;
  let fixture: ComponentFixture<ClubLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubLineComponent ]
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

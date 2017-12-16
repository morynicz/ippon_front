import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFullComponent } from './club-full.component';

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubFullComponent ]
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

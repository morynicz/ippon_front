import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPhaseFullComponent } from './group-phase-full.component';

describe('GroupPhaseFullComponent', () => {
  let component: GroupPhaseFullComponent;
  let fixture: ComponentFixture<GroupPhaseFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPhaseFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPhaseFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

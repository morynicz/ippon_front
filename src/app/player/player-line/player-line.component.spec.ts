import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLineComponent } from './player-line.component';

describe('PlayerLineComponent', () => {
  let component: PlayerLineComponent;
  let fixture: ComponentFixture<PlayerLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

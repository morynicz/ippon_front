import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PlayerLineComponent } from './player-line.component';
import { Player } from '../player';

describe('PlayerLineComponent', () => {
  let component: PlayerLineComponent;
  let fixture: ComponentFixture<PlayerLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerLineComponent],
      imports: [RouterTestingModule]
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

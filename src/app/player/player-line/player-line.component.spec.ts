import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { PlayerLineComponent } from './player-line.component';
import { Player } from '../player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';

describe('PlayerLineComponent', () => {
  let component: PlayerLineComponent;
  let fixture: ComponentFixture<PlayerLineComponent>;
  let expectedPlayer: Player;
  let html;
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
    expectedPlayer = {
      name: 'P1',
      surname: 'S1',
      id: 0
    };
    component.player = expectedPlayer;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe("when created", () => {
    it("should display player name", () => {
      expect(html.textContent).toContain(expectedPlayer.name);
    });
    it("should display player surname", () => {
      expect(html.textContent).toContain(expectedPlayer.surname);
    });
    it('should provide link to the player', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/player/' + expectedPlayer.id);
    });
  })
});

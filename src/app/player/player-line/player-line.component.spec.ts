import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { PlayerLineComponent } from './player-line.component';
import { Player, Sex, Rank } from '../player';

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
      sex: Sex.Male,
      birthday: new Date("2001-01-01"),
      rank: Rank.Kyu_5,
      club_id: 0,
      id: 0
    };
    component.player = expectedPlayer;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

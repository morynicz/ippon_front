import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightLineComponent } from './fight-line.component';
import { Player } from '../../player/player';
import { Sex } from '../../sex';
import { Rank } from '../../rank';
import { Point, PointType } from '../../point/point';
import { PointTypePipe } from '../../point/point-type.pipe';
import { Observable, of } from 'rxjs';
import { PointServiceSpy } from '../../point/point.service.spy';
import { PlayerService } from '../../player/player.service';
import { PointService } from '../../point/point.service';
import { Fight } from '../fight';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FightServiceSpy } from '../fight.service.spy';
import { FightService } from '../fight.service';

const fightId: number = 4;

const akaPlayer: Player = {
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 0
}

const shiroPlayer: Player = {
  name: 'P2',
  surname: 'S2',
  sex: Sex.Female,
  birthday: new Date("2002-02-02"),
  rank: Rank.Kyu_2,
  club_id: 2,
  id: 1
}

const points: Point[] = [
  {
    player: akaPlayer.id,
    fight: fightId,
    type: PointType.Foul,
    id: 9
  },
  {
    player: shiroPlayer.id,
    fight: fightId,
    type: PointType.Other,
    id: 10
  }
]

const fight: Fight = {
  id: fightId,
  points: [],
  aka: akaPlayer.id,
  shiro: shiroPlayer.id,
  team_fight: 33,
  orderingNumber: 0
}

class PlayerServiceSpy {
  getValues: number[];
  getReturnValues: Player[];
  getPlayer(id: number): Observable<Player> {
    this.getValues.push(id);
    return of(this.getReturnValues.shift());
  }
}


describe('FightLineComponent', () => {
  let component: FightLineComponent;
  let fixture: ComponentFixture<FightLineComponent>;
  let playerService: PlayerServiceSpy;
  let pointService: PointServiceSpy;
  let fightService: FightServiceSpy;
  let html;

  beforeEach(async(() => {
    playerService = new PlayerServiceSpy();
    playerService.getReturnValues = [
      akaPlayer,
      shiroPlayer
    ];
    playerService.getValues = [];
    pointService = new PointServiceSpy();
    pointService.getListReturnValues.push(points);
    fightService = new FightServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        FightLineComponent,
        PointTypePipe
      ],
      providers: [
        {
          provide: PlayerService,
          useValue: playerService
        },
        {
          provide: PointService,
          useValue: pointService
        },
        {
          provide: FightService,
          useValue: fightService
        }
      ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightLineComponent);
    component = fixture.componentInstance;
    component.fight = fight;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should call points service to get points for it's fight", () => {
    fixture.whenStable().then(() => {
      expect(pointService.getListValue).toContain(fightId);
    });
  });

  it("should call player service get for both player ids", () => {
    fixture.whenStable().then(() => {
      expect(playerService.getValues).toContain(akaPlayer.id);
      expect(playerService.getValues).toContain(shiroPlayer.id);
    });
  });

  it("should display akaPlayer name and surname", () => {
    expect(html.textContent).toContain(akaPlayer.name);
    expect(html.textContent).toContain(akaPlayer.surname);
  });

  it("should display shiroPlayer name and surname", () => {
    expect(html.textContent).toContain(shiroPlayer.name);
    expect(html.textContent).toContain(shiroPlayer.surname);
  });

  it("should display points awarded in this fight", () => {
    let pipe: PointTypePipe = new PointTypePipe();
    expect(html.textContent).toContain(pipe.transform(PointType.Other));
    expect(html.textContent).toContain(pipe.transform(PointType.Foul));
  });

  it('should provide link to the fight', () => {
    const link = fixture.debugElement.query(By.css('a'));
    expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
      .toBe('/fights/' + fight.id);
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-fight')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;

    beforeEach(async(() => {
      reloadRequested = false;
      component.fight = fight;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-fight"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for point to fight.service",
      () => {
        fixture.whenStable().then(() => {
          expect(fightService.deleteValue).toEqual(fight);
        });
      });

    it("triggers reload request in parent component", () => {
      fixture.whenStable().then(() => {
        expect(reloadRequested).toBe(true);
      });
    });

  });

});

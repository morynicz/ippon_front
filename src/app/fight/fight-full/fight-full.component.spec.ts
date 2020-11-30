import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FightFullComponent } from './fight-full.component';
import { FightService } from '../fight.service';
import { FightServiceSpy } from '../fight.service.spy';
import { Fight } from '../fight';

import { PlayerService } from '../../player/player.service';
import { Player } from '../../player/player';
import { Sex } from '../../sex';
import { Rank } from '../../rank';

import { PointFormComponent } from '../../point/point-form/point-form.component';
import { PointLineComponent } from '../../point/point-line/point-line.component';
import { PointTypePipe } from '../../point/point-type.pipe';
import { PointService } from '../../point/point.service';
import { PointServiceSpy } from '../../point/point.service.spy';
import { Point, PointType } from '../../point/point';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { PlayerServiceSpy } from '../../player/player.service.spy';
import { FightStatus } from '../../fight-status';
import { FightWinner } from '../../fight-winner';
import { By } from '@angular/platform-browser';

describe('FightFullComponent', () => {
  const fightId: number = 4;

  const akaPlayer: Player = {
    name: 'P1',
    surname: 'S1',
    id: 0
  }

  const shiroPlayer: Player = {
    name: 'P2',
    surname: 'S2',
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
    orderingNumber: 0,
    status: FightStatus.Prepared,
    winner: FightWinner.None
  }

  let component: FightFullComponent;
  let fixture: ComponentFixture<FightFullComponent>;
  let fightService: FightServiceSpy;
  let playerService: PlayerServiceSpy;
  let pointService: PointServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    fightService = new FightServiceSpy();
    playerService = new PlayerServiceSpy();
    playerService.getReturnValues = [
      akaPlayer,
      shiroPlayer
    ];
    playerService.getValues = [];
    pointService = new PointServiceSpy();
    pointService.getListReturnValues.push(points);
    fightService.getReturnValues.push(fight);
    TestBed.configureTestingModule({
      declarations: [
        FightFullComponent,
        PointFormComponent,
        PointLineComponent,
        PointTypePipe
      ],
      providers: [
        {
          provide: FightService,
          useValue: fightService
        },
        {
          provide: PlayerService,
          useValue: playerService
        },
        {
          provide: PointService,
          useValue: pointService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: fightId })
            }
          }
        }
      ],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  describe("when created", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FightFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should call fightService to get the fight", () => {
      expect(fightService.getValues).toContain(fightId);
    });

    it("should call points service to get points for it's fight", () => {
      expect(pointService.getListValue).toContain(fightId);
    });
    it("should call player service get for both player ids", () => {
      expect(playerService.getValues).toContain(akaPlayer.id);
      expect(playerService.getValues).toContain(shiroPlayer.id);
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
      expect(html.textContent).toContain(pipe.transform(PointType.Other));
    });
    it("should not display form for adding new points", () => {
      expect(html.querySelector('#add-point-form')).toBeFalsy();
    });
  });
  describe("when user is authorized", () => {
    beforeEach(() => {
      fightService.isAuthorizedReturnValue = true;
      fixture = TestBed.createComponent(FightFullComponent);
      component = fixture.componentInstance;
      component.fight = fight;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it("should display form for adding new points", () => {
      expect(html.querySelector('#add-point-form')).toBeTruthy();
    });

    it("should allow setting aka as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-aka'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByAka: Fight = { ...fight };
      fightWonByAka.winner = FightWinner.Aka;
      expect(fightService.updateValue).toEqual(fightWonByAka);
    });

    it("should allow setting shiro as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-shiro'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByShiro: Fight = { ...fight };
      fightWonByShiro.winner = FightWinner.Shiro;
      expect(fightService.updateValue).toEqual(fightWonByShiro);
    });

    it("should allow setting none as the winner", () => {
      let button = fixture.debugElement.query(By.css('#winner-selection-none'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightWonByNone: Fight = { ...fight };
      fightWonByNone.winner = FightWinner.None;
      expect(fightService.updateValue).toEqual(fightWonByNone);
    });

    it("should allow setting fight as started", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-started'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightStarted: Fight = { ...fight };
      fightStarted.status = FightStatus.Started;
      expect(fightService.updateValue).toEqual(fightStarted);
    });

    it("should allow setting fight as prepared", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-prepared'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightPrepared: Fight = { ...fight };
      fightPrepared.status = FightStatus.Prepared;
      expect(fightService.updateValue).toEqual(fightPrepared);
    });

    it("should allow setting fight as finished", () => {
      let button = fixture.debugElement.query(By.css('#status-selection-finished'));
      button.triggerEventHandler('change', { target: button.nativeElement });
      let fightFinished: Fight = { ...fight };
      fightFinished.status = FightStatus.Finished;
      expect(fightService.updateValue).toEqual(fightFinished);
    });

    describe("when reloadPoints() method is called", () => {
      beforeEach(() => {
        component.reload();
      });
      it("loads points again", () => {
        expect(pointService.getListValue.length).toBe(2);
        expect(pointService.getListValue[1]).toBe(fightId);
      });
    });
  });
});

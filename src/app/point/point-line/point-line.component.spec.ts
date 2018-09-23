import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PointLineComponent } from './point-line.component';
import { Point, PointType } from '../point';
import { PointService } from '../point.service';
import { PointServiceSpy } from '../point.service.spy';
import { PointTypePipe } from '../point-type.pipe';
import { Player } from '../../player/player';
import { Sex } from '../../sex';
import { Rank } from '../../rank';

const akaPlayer: Player = {
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 0
}

const shiroPlayer = {
  name: 'P2',
  surname: 'S2',
  sex: Sex.Female,
  birthday: new Date("2002-02-02"),
  rank: Rank.Kyu_2,
  club_id: 2,
  id: 1
}

const fightId = 44;

describe('PointLineComponent', () => {
  let component: PointLineComponent;
  let fixture: ComponentFixture<PointLineComponent>;
  let pipe: PointTypePipe;
  let pointService: PointServiceSpy;

  beforeEach(async(() => {
    pointService = new PointServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        PointLineComponent,
        PointTypePipe
      ],
      providers: [
        { provide: PointService, useValue: pointService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointLineComponent);
    component = fixture.componentInstance;
    pipe = new PointTypePipe();
    component.akaPlayer = akaPlayer;
    component.shiroPlayer = shiroPlayer;
    component.isAuthorized = false;
  });

  it("shows aka point on the aka point side", () => {
    const point: Point = {
      id: 0,
      fight: fightId,
      player: akaPlayer.id,
      type: PointType.Men
    };
    component.point = point;
    fixture.detectChanges();
    let akaPointSide = fixture.debugElement.query(By.css("#aka-point"));
    let shiroPointSide = fixture.debugElement.query(By.css("#shiro-point"));
    expect(akaPointSide.nativeElement.textContent).toContain(pipe.transform(point.type));
    expect(shiroPointSide.nativeElement.textContent).toEqual("");
  });

  it("shows shiro point on the shiro point side", () => {
    const point: Point = {
      id: 0,
      fight: fightId,
      player: shiroPlayer.id,
      type: PointType.Foul
    };
    component.point = point;
    fixture.detectChanges();
    let akaPointSide = fixture.debugElement.query(By.css("#aka-point"));
    let shiroPointSide = fixture.debugElement.query(By.css("#shiro-point"));
    expect(shiroPointSide.nativeElement.textContent).toContain(pipe.transform(point.type));
    expect(akaPointSide.nativeElement.textContent).toEqual("");
  });

  it('does not show delete button when user not authorized', () => {
    const html = fixture.debugElement.nativeElement;
    expect(html.querySelector('#delete-point')).toBeFalsy();
  });

  describe("when delete button is clicked", () => {
    let btn;
    let reloadRequested: boolean;
    let point: Point;

    beforeEach(async(() => {
      point = {
        id: 0,
        fight: fightId,
        player: shiroPlayer.id,
        type: PointType.Foul
      };
      reloadRequested = false;
      component.point = point;
      component.reloadRequest.subscribe(req => {
        reloadRequested = true;
      });
      component.isAuthorized = true;
      fixture.detectChanges();
      btn = fixture.debugElement.query(By.css("#delete-point"));
      btn.nativeElement.click();

    }));

    it("sends to delete request for point to point.service",
      () => {
        fixture.whenStable().then(() => {
          expect(pointService.deleteValue).toEqual(point);
        });
      });

    it("triggers reload request in parent component", () => {
      fixture.whenStable().then(() => {
        expect(reloadRequested).toBe(true);
      });
    });

  });
});

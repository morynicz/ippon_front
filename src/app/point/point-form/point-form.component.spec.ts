import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PointFormComponent } from './point-form.component';

import { Player } from '../../player/player';

import { Point, PointType } from '../point';
import { PointService } from '../point.service';
import { PointTypePipe } from '../point-type.pipe';
import { PointServiceSpy } from '../point.service.spy';

const akaPlayer: Player = {
  name: 'P1',
  surname: 'S1',
  id: 0
}

const shiroPlayer = {
  name: 'P2',
  surname: 'S2',
  id: 1
}

const fightId: number = 7;

describe('PointFormComponent', () => {
  let component: PointFormComponent;
  let fixture: ComponentFixture<PointFormComponent>;
  let pointService: PointServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
    pointService = new PointServiceSpy();
    TestBed.configureTestingModule({
      declarations: [
        PointFormComponent,
        PointTypePipe
      ],
      imports: [FormsModule],
      providers: [
        { provide: PointService, useValue: pointService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointFormComponent);
    component = fixture.componentInstance;
    component.akaPlayer = akaPlayer;
    component.shiroPlayer = shiroPlayer;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("When component is created", () => {
    it("should display akaPlayer name and surname", () => {
      expect(html.textContent).toContain(akaPlayer.name);
      expect(html.textContent).toContain(akaPlayer.surname);
    });

    it("should display shiroPlayer name and surname", () => {
      expect(html.textContent).toContain(shiroPlayer.name);
      expect(html.textContent).toContain(shiroPlayer.surname);
    });

    it("should display point type symbols", () => {
      expect(html.textContent).toContain("M");
      expect(html.textContent).toContain("K");
      expect(html.textContent).toContain("D");
      expect(html.textContent).toContain("T");
      expect(html.textContent).toContain("H");
      expect(html.textContent).toContain("▲");
      expect(html.textContent).toContain("●");
    });
  });

  describe("when aka player button is clicked with point type set to men",
    () => {
      let btn;
      let reloadRequested: boolean;
      let akaPoint: Point;

      beforeEach(waitForAsync(() => {
        akaPoint = {
          id: 0,
          fight: fightId,
          player: akaPlayer.id,
          type: PointType.Men
        };
        reloadRequested = false;
        component.pointType = PointType.Men;
        component.fightId = fightId;
        component.reloadRequest.subscribe(() => {
          reloadRequested = true;
        });
        btn = fixture.debugElement.query(By.css("#aka-add-point"));
        btn.nativeElement.click();
      }));

      it("sends to point service new men point for aka player",
        () => {
          expect(pointService.addValue).toEqual(akaPoint);
        });

      it("triggers reload request in parent component", () => {
        expect(reloadRequested).toBe(true);
      });
    });

  describe("when shiro player button is clicked with point type set to foul",
    () => {
      let btn;
      let reloadRequested: boolean;
      let shiroPoint: Point;

      beforeEach(waitForAsync(() => {
        shiroPoint = {
          id: 0,
          fight: fightId,
          player: shiroPlayer.id,
          type: PointType.Foul
        };
        reloadRequested = false;
        component.pointType = PointType.Foul;
        component.fightId = fightId;
        component.reloadRequest.subscribe(() => {
          reloadRequested = true;
        });
        btn = fixture.debugElement.query(By.css("#shiro-add-point"));
        btn.nativeElement.click();
      }));

      it("sends to point service new men point for shiro player",
        () => {
          expect(pointService.addValue).toEqual(shiroPoint);
        });

      it("triggers reload request in parent component", () => {
        expect(reloadRequested).toBe(true);
      });
    });


});

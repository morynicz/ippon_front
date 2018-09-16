import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
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

import { AuthorizationService } from '../../authorization/authorization.service';
import { Authorization } from "../../authorization/Authorization";

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
    playerId: akaPlayer.id,
    fightId: fightId,
    type: PointType.Foul,
    id: 9
  },
  {
    playerId: shiroPlayer.id,
    fightId: fightId,
    type: PointType.Other,
    id: 10
  }
]

const fight: Fight = {
  id: fightId,
  points: [],
  akaId: akaPlayer.id,
  shiroId: shiroPlayer.id,
  teamFightId: 33,
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

class AuthorizationServiceSpy {
  isTournamentAdminResult: boolean = false;
  isTournamentAdminCallArgument: number = -1;
  isTournamentAdmin(tournamentId: number): Observable<boolean> {
    this.isTournamentAdminCallArgument = tournamentId;
    return of(this.isTournamentAdminResult);
  }
}

// describe('FightFullComponent', () => {
//   let component: FightFullComponent;
//   let fixture: ComponentFixture<FightFullComponent>;
//   let fightService: FightServiceSpy;
//   let playerService: PlayerServiceSpy;
//   let pointService: PointServiceSpy;
//   let authorizationService: AuthorizationServiceSpy;
//   let html;

//   beforeEach(async(() => {
//     fightService = new FightServiceSpy();
//     playerService = new PlayerServiceSpy();
//     playerService.getReturnValues = [
//       akaPlayer,
//       shiroPlayer
//     ];
//     playerService.getValues = [];
//     pointService = new PointServiceSpy();
//     pointService.getListReturnValue = points;
//     authorizationService = new AuthorizationServiceSpy();
//     authorizationService.isTournamentAdminResult = false;
//     TestBed.configureTestingModule({
//       declarations: [
//         FightFullComponent,
//         PointFormComponent,
//         PointLineComponent,
//         PointTypePipe
//       ],
//       providers: [
//         {
//           provide: FightService,
//           useValue: fightService
//         },
//         {
//           provide: PlayerService,
//           useValue: playerService
//         },
//         {
//           provide: PointService,
//           useValue: pointService
//         }
//       ],
//       imports: [FormsModule]
//     })
//       .compileComponents();
//   }));

//   describe("when created", () => {
//     beforeEach(() => {
//       fixture = TestBed.createComponent(FightFullComponent);
//       component = fixture.componentInstance;
//       component.fight = fight;
//       fixture.detectChanges();
//       html = fixture.debugElement.nativeElement;
//     });

//     it("should call points service to get points for it's fight", () => {
//       fixture.whenStable().then(() => {
//         expect(pointService.getListValue).toContain(fightId);
//       });
//     });
//     it("should call player service get for both player ids", () => {
//       fixture.whenStable().then(() => {
//         expect(playerService.getValues).toContain(akaPlayer.id);
//         expect(playerService.getValues).toContain(shiroPlayer.id);
//       });
//     });

//     it("should display akaPlayer name and surname", () => {
//       expect(html.textContent).toContain(akaPlayer.name);
//       expect(html.textContent).toContain(akaPlayer.surname);
//     });

//     it("should display shiroPlayer name and surname", () => {
//       expect(html.textContent).toContain(shiroPlayer.name);
//       expect(html.textContent).toContain(shiroPlayer.surname);
//     });

//     it("should display points awarded in this fight", () => {
//       let pipe: PointTypePipe = new PointTypePipe();
//       expect(html.textContent).toContain(pipe.transform(PointType.Other));
//       expect(html.textContent).toContain(pipe.transform(PointType.Other));
//     });
//   });
//   describe("when user is authorized", () => {
//     beforeEach(() => {
//       authorizationService.isTournamentAdminResult = true;
//       fixture = TestBed.createComponent(FightFullComponent);
//       component = fixture.componentInstance;
//       component.fight = fight;
//       fixture.detectChanges();
//       html = fixture.debugElement.nativeElement;
//     });

//     it("should display form for adding new points", () => {
//       expect(html.querySelector('#add-point-form')).toBeTruthy();
//     });
//   });
// });

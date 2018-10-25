import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PlayerFullComponent } from './player-full.component';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { Rank, RANK_STRINGS } from '../../rank';
import { Sex } from '../../sex';

import { Club } from '../../club/club'
import { ClubService } from '../../club/club.service';

import { KendoRankPipe } from '../kendo-rank.pipe';
import { AuthorizationService } from '../../authorization/authorization.service';
import { Authorization } from "../../authorization/Authorization";
import { PlayerServiceSpy } from '../player.service.spy';

const playerId: number = 4;

const expectedPlayer: Player = {
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: playerId
};

class ClubServiceSpy {
  id: number;
  club: Club = {
    id: 1,
    name: 'C4',
    description: 'D',
    city: 'Ci',
    webpage: 'W'
  }
  getClub(id: number): Observable<Club> {
    return of(this.club);
  }
}

class AuthorizationServiceDummy {
  isClubAdminResult: boolean = false;
  isClubAdminCallArgument: number = -1;
  isClubAdmin(clubId: number): Observable<boolean> {
    this.isClubAdminCallArgument = clubId;
    return of(this.isClubAdminResult);
  }
}

describe('PlayerFullComponent', () => {
  let component: PlayerFullComponent;
  let fixture: ComponentFixture<PlayerFullComponent>;
  let playerService: PlayerServiceSpy;
  let clubService: ClubServiceSpy;
  let authorizationService: AuthorizationServiceDummy;
  let html;

  beforeEach(async(() => {
    playerService = new PlayerServiceSpy();
    playerService.getReturnValues.push(expectedPlayer);
    clubService = new ClubServiceSpy();
    authorizationService = new AuthorizationServiceDummy();
  }));

  describe('when user is not admin', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [PlayerFullComponent, KendoRankPipe],
        imports: [RouterTestingModule],
        providers: [
          { provide: PlayerService, useValue: playerService },
          { provide: ClubService, useValue: clubService },
          { provide: AuthorizationService, useValue: authorizationService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: playerId })
              }
            }
          }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("shows player's name", async(() => {
      expect(html.textContent).toContain('P1');
    }));
    it("shows player's surname", () => {
      expect(html.textContent).toContain('S1');
    });
    it("shows player's club name", () => {
      expect(html.textContent).toContain('C4');
    });
    it("does not show player's rank", () => {
      expect(html.textContent).not.toContain(RANK_STRINGS[Rank.Kyu_5]);
    });
    it("does not show player's birthday", () => {
      expect(html.textContent).not.toContain("2001-01-01");
    });
    it("does not show player's gender", () => {
      expect(html.textContent).not.toContain("Male");
    });
  });
  describe("when user is admin", () => {
    beforeEach(async(() => {
      authorizationService.isClubAdminResult = true;
      TestBed.configureTestingModule({
        declarations: [PlayerFullComponent, KendoRankPipe],
        imports: [RouterTestingModule],
        providers: [
          { provide: PlayerService, useValue: playerService },
          { provide: ClubService, useValue: clubService },
          { provide: AuthorizationService, useValue: authorizationService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: playerId })
              }
            }
          }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      html = fixture.debugElement.nativeElement;
    });
    it("shows player's rank", async(() => {
      expect(html.textContent).toContain(RANK_STRINGS[Rank.Kyu_5]);
    }));
    it("does show player's birthday", () => {
      expect(html.textContent).toContain("2001-01-01");
    });
    it("does show player's gender", () => {
      expect(html.textContent).toContain("Male");
    });
    it('should display admin controls if the user is club admin', () => {
      authorizationService.isClubAdminResult = true;
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement;
        const html = de.nativeElement;
        expect(html.querySelector('#delete-player')).toBeTruthy();
        expect(html.querySelector('#edit-player')).toBeTruthy();
      });
    });
    it('should call deletePlayer from player service with correct id when delete player button clicked',
      async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const btn = fixture.debugElement.query(By.css('#delete-player'));
          btn.triggerEventHandler('click', null);
          expect(playerService.deleteValue).toEqual(expectedPlayer);
        });
      }));
    it('should provide link to editing player', () => {
      const btn = fixture.debugElement.query(By.css('#edit-player'));
      expect(btn.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/player/' + playerId + '/edit');
    });
  });
});

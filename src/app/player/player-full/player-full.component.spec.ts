import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
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
import { PlayerServiceSpy } from '../player.service.spy';
import { ClubServiceSpy } from '../../club/club.service.spy';

const playerId: number = 4;

const expectedPlayer: Player = {
  name: 'P1',
  surname: 'S1',
  id: playerId
};

const club: Club = {
  id: 1,
  name: 'C4',
  description: 'D',
  city: 'Ci',
  webpage: 'W'
};

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
    clubService.getReturnValues.push(club);
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
  });
  describe("when user is admin", () => {
    beforeEach(async(() => {
      playerService.isAuthorizedReturnValue = true;
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
    it('should display admin controls if the user is club admin', () => {
      authorizationService.isClubAdminResult = true;
      fixture.detectChanges();
      const de = fixture.debugElement;
      const html = de.nativeElement;
      expect(html.querySelector('#delete-player')).toBeTruthy();
      expect(html.querySelector('#edit-player')).toBeTruthy();
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

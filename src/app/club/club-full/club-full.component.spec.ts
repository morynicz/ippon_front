import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';

import { Player } from '../../player/player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';

import { AuthorizationService } from '../../authorization/authorization.service';
import { ClubServiceSpy } from '../club.service.spy';

const clubId: number = 1;
const club: Club = {
  id: clubId,
  name: 'C1',
  description: 'D1',
  city: 'Ci1',
  webpage: 'W1'
};

const players: Player[] = [{
  name: 'P1',
  surname: 'S1',
  id: 0
},
{
  name: 'P3',
  surname: 'S3',
  id: 2
}];

class AuthorizationServiceDummy {
  isClubAdminResult: boolean = false;
  isClubAdminCallArgument: number = -1;
  isClubAdmin(clubId: number): Observable<boolean> {
    this.isClubAdminCallArgument = clubId;
    return of(this.isClubAdminResult);
  }
}

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;
  let authorizationService: AuthorizationServiceDummy;
  let clubService: ClubServiceSpy;

  describe("when user is not admin", () => {
    beforeEach(async(() => {
      authorizationService = new AuthorizationServiceDummy();
      clubService = new ClubServiceSpy();
      clubService.getPlayersReturnValues.push(players);
      clubService.getReturnValues.push(club);
      TestBed.configureTestingModule({
        providers: [
          { provide: ClubService, useValue: clubService },
          { provide: AuthorizationService, useValue: authorizationService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: clubId })
              }
            }
          }
        ],
        imports: [RouterTestingModule],
        declarations: [ClubFullComponent, PlayerLineComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ClubFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display all club details', () => {
      const html = fixture.debugElement.nativeElement;
      expect(html.textContent).toContain('C1');
      expect(html.textContent).toContain('Ci1');
      expect(html.textContent).toContain('D1');
      expect(html.textContent).toContain('W1');
    });

    it('should display all club players', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement;
        const html = de.nativeElement;
        const playerLines = html.querySelectorAll('ippon-player-line');
        expect(playerLines[0].textContent).toContain('P1');
        expect(playerLines[0].textContent).toContain('S1');
        expect(playerLines[1].textContent).toContain('P3');
        expect(playerLines[1].textContent).toContain('S3');
        expect(clubService.getPlayersValues).toContain(clubId);
      });
    }));

    it('should not display admin controls if the user is not club admin', async(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const de = fixture.debugElement;
        const html = de.nativeElement;
        expect(html.querySelector('#delete-club')).toBeFalsy();
        expect(html.querySelector('#edit-club')).toBeFalsy();
        expect(html.querySelector('#new-player')).toBeFalsy();
      });
    }));
  });
  describe("when user is admin", () => {
    beforeEach(async(() => {
      authorizationService = new AuthorizationServiceDummy();
      authorizationService.isClubAdminResult = true;
      clubService = new ClubServiceSpy();
      clubService.getReturnValues.push(club);
      TestBed.configureTestingModule({
        providers: [
          { provide: ClubService, useValue: clubService },
          { provide: AuthorizationService, useValue: authorizationService }
        ],
        imports: [RouterTestingModule],
        declarations: [
          ClubFullComponent,
          PlayerLineComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ClubFullComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should display admin controls if the user is club admin', () => {
      authorizationService.isClubAdminResult = true;
      fixture.detectChanges();
      const de = fixture.debugElement;
      const html = de.nativeElement;
      expect(html.querySelector('#delete-club')).toBeTruthy();
      expect(html.querySelector('#edit-club')).toBeTruthy();
      expect(html.querySelector('#new-player-club')).toBeTruthy();
      expect(html.querySelector('#manage-admins')).toBeTruthy();
    });

    it('should call deleteClub from club service with correct id when delete club button clicked',
      async(() => {
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          const btn = fixture.debugElement.query(By.css('#delete-club'));
          btn.triggerEventHandler('click', null);
          expect(clubService.deleteValue).toEqual(club);
        });
      }));

    it('should provide link to editing club', () => {
      const btn = fixture.debugElement.query(By.css('#edit-club'));
      expect(btn.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/club/' + clubId + '/edit');
    });

    it('should provide link to adding new players', () => {
      const btn = fixture.debugElement.query(By.css('#new-player-club'));
      expect(btn.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/player/new');
    });

  });
});

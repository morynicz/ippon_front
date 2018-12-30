import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';
import { Player } from '../../player/player';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
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

describe('ClubFullComponent', () => {
  let fixture: ComponentFixture<ClubFullComponent>;
  let clubService: ClubServiceSpy;

  describe("when user is not admin", () => {
    beforeEach(async(() => {
      clubService = new ClubServiceSpy();
      clubService.getPlayersReturnValues.push(players);
      clubService.getReturnValues.push(club);
      TestBed.configureTestingModule({
        providers: [
          { provide: ClubService, useValue: clubService },
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
      fixture.detectChanges();
    });

    it("should call club API to check for user authorization", () => {
      expect(clubService.isAuthorizedValue).toEqual(clubId);
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
      clubService = new ClubServiceSpy();
      clubService.getReturnValues.push(club);
      clubService.isAuthorizedReturnValue = true;
      TestBed.configureTestingModule({
        providers: [
          { provide: ClubService, useValue: clubService },
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
      fixture.detectChanges();
    });

    it('should display admin controls if the user is club admin', () => {
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

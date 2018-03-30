import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';

import { Player, Sex, Rank } from '../../player/player';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { PlayerService } from '../../player/player.service';

import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

const clubId: number = 1;

class ClubServiceSpy {
  id: number;
  deleteClubCallId: number = -1;
  getPlayersClubId: number = -1;
  club: Club = {
    id: clubId,
    name: 'C1',
    description: 'D1',
    city: 'Ci1',
    webpage: 'W1'
  };
  getClub(id: number): Observable<Club> {
    this.id = id;
    return of(this.club);
  }
  deleteClub(club: Club): Observable<Club> {
    this.deleteClubCallId = club.id;
    return of(this.club);
  }

  players: Player[] = [{
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: clubId,
    id: 0
  },
  {
    name: 'P3',
    surname: 'S3',
    sex: Sex.Female,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_4,
    club_id: clubId,
    id: 2
  }];
  getPlayers(clubId: number): Observable<Player[]> {
    this.getPlayersClubId = clubId;
    return of(this.players);
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

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;
  let authorizationService: AuthorizationServiceDummy;
  let clubService: ClubServiceSpy;

  beforeEach(async(() => {
    authorizationService = new AuthorizationServiceDummy();
    clubService = new ClubServiceSpy();
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
      expect(clubService.getPlayersClubId).toEqual(clubId);
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

describe('ClubFullComponent with admin logged in', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;
  let authorizationService: AuthorizationServiceDummy;
  let clubService: ClubServiceSpy;

  beforeEach(async(() => {
    authorizationService = new AuthorizationServiceDummy();
    authorizationService.isClubAdminResult = true;
    clubService = new ClubServiceSpy();
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useValue: clubService },
        { provide: AuthorizationService, useValue: authorizationService }
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

  it('should display admin controls if the user is club admin', () => {
    authorizationService.isClubAdminResult = true;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const de = fixture.debugElement;
      const html = de.nativeElement;
      expect(html.querySelector('#delete-club')).toBeTruthy();
      expect(html.querySelector('#edit-club')).toBeTruthy();
      expect(html.querySelector('#new-player')).toBeTruthy();
    });
  });
});

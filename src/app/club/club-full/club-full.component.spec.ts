import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ClubFullComponent } from './club-full.component';
import { Club } from '../club';
import { ClubService } from '../club.service';

import { Player, Sex, Rank } from '../../player/player';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';
import { PlayerService } from '../../player/player.service';

import { Authorization, AuthorizationService } from '../../authorization/authorization.service';

class ClubServiceSpy {
  id: number;
  club: Club = {
    id: 1,
    name: 'C1',
    description: 'D1',
    city: 'Ci1',
    webpage: 'W1'
  };
  getClub(id: number): Observable<Club> {
    this.id = id;
    return of(this.club);
  }
}

class PlayerServiceDummy {
  players: Player[] = [{
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 0,
    id: 0
  },
  {
    name: 'P2',
    surname: 'S2',
    sex: Sex.Male,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_4,
    club_id: 1,
    id: 1
  },
  {
    name: 'P3',
    surname: 'S3',
    sex: Sex.Female,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_4,
    club_id: 0,
    id: 2
  }];
  getPlayers(): Observable<Player[]> {
    return of(this.players);
  }
}

class AuthorizationServiceDummy {
  isClubAdminResult: boolean = false;
  isClubAdminCallArgument: number = -1;
  isClubAdmin(clubId: number): Observable<Authorization> {
    this.isClubAdminCallArgument = clubId;
    return of({ isAuthorized: this.isClubAdminResult });
  }
}

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;
  let authorizationService: AuthorizationServiceDummy;

  beforeEach(async(() => {
    authorizationService = new AuthorizationServiceDummy();
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useClass: ClubServiceSpy },
        { provide: PlayerService, useClass: PlayerServiceDummy },
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

  it('should display all club players but not other clubs players', () => {
    const de = fixture.debugElement;
    const html = de.nativeElement;
    const playerLines = html.querySelectorAll('ippon-player-line');
    expect(playerLines[0].textContent).toContain('P1');
    expect(playerLines[0].textContent).toContain('S1');
    expect(playerLines[1].textContent).toContain('P3');
    expect(playerLines[1].textContent).toContain('S3');
  });

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

  beforeEach(async(() => {
    authorizationService = new AuthorizationServiceDummy();
    authorizationService.isClubAdminResult = true;
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useClass: ClubServiceSpy },
        { provide: PlayerService, useClass: PlayerServiceDummy },
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

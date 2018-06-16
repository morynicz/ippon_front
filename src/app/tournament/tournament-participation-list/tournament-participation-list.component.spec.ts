import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TournamentParticipationListComponent } from './tournament-participation-list.component';

import { TournamentParticipationFormComponent } from '../tournament-participation-form/tournament-participation-form.component';

import { Player } from '../../player/player';
import { Rank } from '../../rank';
import { Sex } from '../../sex';
import { TournamentParticipation } from '../tournament-participation';
import { TournamentParticipantService } from '../tournament-participant.service';
import { TournamentParticipantServiceSpy } from '../tournament-participant.service.spy';

import { PlayerService } from '../../player/player.service';
import { PlayerLineComponent } from '../../player/player-line/player-line.component';

const tournamentId = 1;

const participations: TournamentParticipation[] = [{
  id: 1,
  tournament_id: tournamentId,
  player: {
    name: 'P1',
    surname: 'S1',
    sex: Sex.Male,
    birthday: new Date("2001-01-01"),
    rank: Rank.Kyu_5,
    club_id: 1,
    id: 1
  },
  is_paid: true,
  is_registered: false,
  is_sex_ok: true,
  is_age_ok: false,
  is_rank_ok: true,
  is_qualified: false,
  notes: "N1"
},
{
  id: 2,
  tournament_id: tournamentId,
  player: {
    name: 'P2',
    surname: 'S2',
    sex: Sex.Female,
    birthday: new Date("2002-02-02"),
    rank: Rank.Kyu_1,
    club_id: 2,
    id: 2
  },
  is_paid: true,
  is_registered: false,
  is_sex_ok: true,
  is_age_ok: false,
  is_rank_ok: true,
  is_qualified: false,
  notes: "N2"
}];

const players: Player[] = [
  {
    name: 'P3',
    surname: 'S3',
    sex: Sex.Female,
    birthday: new Date("2003-03-03"),
    rank: Rank.Dan_3,
    club_id: 3,
    id: 3
  },
  {
    name: 'P4',
    surname: 'S4',
    sex: Sex.Male,
    birthday: new Date("2004-04-04"),
    rank: Rank.Kyu_2,
    club_id: 4,
    id: 4
  }
];

describe('TournamentParticipationListComponent', () => {
  let component: TournamentParticipationListComponent;
  let fixture: ComponentFixture<TournamentParticipationListComponent>;
  let tournamentParticipantService: TournamentParticipantServiceSpy;
  let html;

  beforeEach(async(() => {
    tournamentParticipantService = new TournamentParticipantServiceSpy();
    tournamentParticipantService.getParticipationsReturnValue = participations;
    tournamentParticipantService.getNonParticipantsReturnValue = players;
    TestBed.configureTestingModule({
      declarations: [
        TournamentParticipationListComponent,
        TournamentParticipationFormComponent,
        PlayerLineComponent
      ],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: TournamentParticipantService, useValue: tournamentParticipantService
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: tournamentId })
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  describe('when created', () => {
    it('should call participations api to get participations for current tournament', () => {
      fixture.whenStable().then(() => {
        expect(tournamentParticipantService.getParticipationsValue).toBe(tournamentId);
      });
    });

    it("should display all participations it received", () => {
      expect(html.innerHTML).toContain('N1');
      expect(html.innerHTML).toContain('N2');
      expect(html.textContent).toContain('S1');
      expect(html.textContent).toContain('S2');
      expect(html.textContent).toContain('P1');
      expect(html.textContent).toContain('P2');
    });

    it("should display the players who can become participants", () => {
      let playersHtml = fixture.debugElement.query(By.css('#non_participants')).nativeElement;
      expect(playersHtml.textContent).toContain('P3');
      expect(playersHtml.textContent).toContain('S3');
      expect(playersHtml.textContent).toContain('P4');
      expect(playersHtml.textContent).toContain('S4');
    });
  });

  describe("when add participant button is pushed", () => {
    let btn;
    let participation: TournamentParticipation;
    beforeEach(() => {
      participation = {
        id: 0,
        tournament_id: tournamentId,
        player: players[0],
        is_paid: false,
        is_registered: false,
        is_sex_ok: false,
        is_age_ok: false,
        is_rank_ok: false,
        is_qualified: false,
        notes: ""
      };

      let newParticipations: TournamentParticipation[] = [{
        id: 1,
        tournament_id: tournamentId,
        player: {
          name: 'P1',
          surname: 'S1',
          sex: Sex.Male,
          birthday: new Date("2001-01-01"),
          rank: Rank.Kyu_5,
          club_id: 1,
          id: 1
        },
        is_paid: true,
        is_registered: false,
        is_sex_ok: true,
        is_age_ok: false,
        is_rank_ok: true,
        is_qualified: false,
        notes: "N1"
      },
      {
        id: 2,
        tournament_id: tournamentId,
        player: {
          name: 'P2',
          surname: 'S2',
          sex: Sex.Female,
          birthday: new Date("2002-02-02"),
          rank: Rank.Kyu_1,
          club_id: 2,
          id: 2
        },
        is_paid: true,
        is_registered: false,
        is_sex_ok: true,
        is_age_ok: false,
        is_rank_ok: true,
        is_qualified: false,
        notes: "N2"
      },
        participation
      ];

      let newPlayers: Player[] = [
        {
          name: 'P4',
          surname: 'S4',
          sex: Sex.Male,
          birthday: new Date("2004-04-04"),
          rank: Rank.Kyu_2,
          club_id: 4,
          id: 4
        }
      ];


      let playerHtml = fixture.debugElement.query(By.css('#non_participants'));
      let buttons = playerHtml.queryAll(By.css('#add-participant'));
      fixture.detectChanges();
      tournamentParticipantService.getParticipationsReturnValue = newParticipations;
      tournamentParticipantService.getNonParticipantsReturnValue = newPlayers;
      buttons[0].nativeElement.click();
      fixture.detectChanges();
    });

    it('shold call the participant service with new participation', () => {
      expect(tournamentParticipantService.addParticipationValue.tournament_id)
        .toBe(participation.tournament_id);
      expect(tournamentParticipantService.addParticipationValue.player)
        .toBe(participation.player);
    });

    it('shold show the new participation', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(html.textContent).toContain('S3');
        expect(html.textContent).toContain('P3');
      });
    });

    it('should remove the participant from non-participant section', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        let playersHtml = fixture.debugElement.query(By.css('#non_participants')).nativeElement;
        expect(playersHtml.textContent).not.toContain('P3');
        expect(playersHtml.textContent).not.toContain('S3');
        expect(playersHtml.textContent).toContain('P4');
        expect(playersHtml.textContent).toContain('S4');
      });
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
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

import { PlayerLineComponent } from '../../player/player-line/player-line.component';


describe('TournamentParticipationListComponent', () => {
  const tournamentId = 1;

  const participations: TournamentParticipation[] = [{
    id: 1,
    tournament_id: tournamentId,
    player: {
      name: 'P1',
      surname: 'S1',
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
      id: 3
    },
    {
      name: 'P4',
      surname: 'S4',
      id: 4
    }
  ];

  let component: TournamentParticipationListComponent;
  let fixture: ComponentFixture<TournamentParticipationListComponent>;
  let tournamentParticipantService: TournamentParticipantServiceSpy;
  let html;

  beforeEach(waitForAsync(() => {
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
      expect(tournamentParticipantService.getParticipationsValue).toBe(tournamentId);
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
      expect(html.textContent).toContain('S3');
      expect(html.textContent).toContain('P3');
    });

    it('should remove the participant from non-participant section', () => {
      fixture.detectChanges();
      let playersHtml = fixture.debugElement.query(By.css('#non_participants')).nativeElement;
      expect(playersHtml.textContent).not.toContain('P3');
      expect(playersHtml.textContent).not.toContain('S3');
      expect(playersHtml.textContent).toContain('P4');
      expect(playersHtml.textContent).toContain('S4');
    });
  });
});

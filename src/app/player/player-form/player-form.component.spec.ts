
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

import { PlayerFormComponent } from './player-form.component';
import { Rank } from '../../rank';
import { Sex } from '../../sex';

import { Club } from '../../club/club'
import { ClubService } from '../../club/club.service';
import { ClubServiceSpy } from '../../club/club.service.spy';
import { DeepPlayer } from '../deep-player';
import { DeepPlayerService } from '../deep-player.service';
import { DeepPlayerServiceSpy } from '../deep-player.service.spy';
import { LocationSpy } from '../../test-utils/location.spy';

const player: DeepPlayer = {
  name: 'P1',
  surname: 'S1',
  sex: Sex.Male,
  birthday: new Date("2001-01-01"),
  rank: Rank.Kyu_5,
  club_id: 0,
  id: 0
}

const clubs: Club[] = [{
  id: 0,
  name: 'C4',
  description: 'D',
  city: 'Ci',
  webpage: 'W'
}, {
  id: 1,
  name: 'C8',
  description: 'D5',
  city: 'Ci12',
  webpage: 'W7'
}];

function expectPlayersToBeEqual(
  value: DeepPlayer,
  expected: DeepPlayer
) {
  expect(value.name).toBe(expected.name);
  expect(value.surname).toBe(expected.surname);
  expect(value.sex).toBe(expected.sex);
  expect(value.rank).toBe(expected.rank);
  expect(value.club_id).toBe(expected.club_id);
  expect(value.birthday).toBe(expected.birthday);
}

describe('PlayerFormComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;
  let playerService: DeepPlayerServiceSpy;
  let clubService: ClubServiceSpy;
  let location: LocationSpy;

  describe('when playerId is available', () => {
    beforeEach(async(() => {
      playerService = new DeepPlayerServiceSpy();
      playerService.getReturnValues.push(player);
      clubService = new ClubServiceSpy();
      clubService.getListReturnValues.push(clubs);
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [PlayerFormComponent],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: DeepPlayerService, useValue: playerService },
          { provide: ClubService, useValue: clubService },
          {
            provide: ActivatedRoute, useValue: {
              snapshot: {
                paramMap: convertToParamMap({ id: player.id })
              }
            }
          },
          { provide: Location, useValue: location }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load name of player with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=name]")).nativeElement.value)
            .toContain(player.name);
        });
      }));

    it('should load surname of player with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=surname]")).nativeElement.value)
            .toContain(player.surname);
        });
      }));
    it('should load rank of player with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=rank]")).nativeElement.value)
            .toContain(player.rank);
        });
      }));
    it('should load sex of player with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          let sexInput = de.queryAll(By.css("[name=sex]"));
          expect(sexInput[0].nativeElement.checked).toBe(true);
          expect(sexInput[1].nativeElement.checked).toBe(false);
        });
      }));
    it('should load club name of player with given id',
      async(() => {
        fixture.whenStable().then(() => {
          let de = fixture.debugElement;
          expect(de.query(By.css("[name=club]")).nativeElement
            .selectedOptions[0].label)
            .toContain(clubs[0].name);
        });
      }));


    describe('when form is filled out and submit clicked',
      () => {
        let expectedPlayer: DeepPlayer;
        let btn;
        beforeEach(async(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-player"));
          expectedPlayer = {
            name: 'P2',
            surname: 'S2',
            sex: Sex.Female,
            birthday: new Date("2002-03-04"),
            rank: Rank.Dan_8,
            club_id: 2,
            id: player.id
          };
          component.player = expectedPlayer;
          fixture.detectChanges();
          btn.nativeElement.click();
          fixture.detectChanges();
        }));
        it('should call player service updatePlayer with player values set in form',
          async(() => {
            fixture.whenStable().then(() => {
              expectPlayersToBeEqual(playerService.updateValue, expectedPlayer);
            });
          }));
        it('should go back to previous location', async(() => {
          fixture.whenStable().then(() => {
            expect(location.clicked).toBeTruthy();
          });
        }));
      });
  });

  describe('when playerId is not available', () => {
    beforeEach(async(() => {
      playerService = new DeepPlayerServiceSpy();
      clubService = new ClubServiceSpy();
      clubService.getListReturnValues.push(clubs);
      location = new LocationSpy();
      TestBed.configureTestingModule({
        declarations: [PlayerFormComponent],
        imports: [FormsModule, RouterTestingModule],
        providers: [
          { provide: DeepPlayerService, useValue: playerService },
          { provide: ClubService, useValue: clubService },
          { provide: Location, useValue: location }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PlayerFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    describe('when form is filled out and submit clicked',
      () => {
        let expectedPlayer: DeepPlayer;
        let btn;
        beforeEach(async(() => {
          fixture.detectChanges();
          btn = fixture.debugElement.query(By.css("#save-player"));
          expectedPlayer = {
            name: 'P2',
            surname: 'S2',
            sex: Sex.Female,
            birthday: new Date("2002-03-04"),
            rank: Rank.Dan_8,
            club_id: 2,
            id: player.id
          };
          component.player = expectedPlayer;
          fixture.detectChanges();
          btn.nativeElement.click();
        }));
        it('should call player service updatePlayer with player values set in form',
          async(() => {
            fixture.whenStable().then(() => {
              expectPlayersToBeEqual(playerService.addValue, expectedPlayer);
            });
          }));
        it('should go back to previous location', async(() => {
          fixture.whenStable().then(() => {
            expect(location.clicked).toBeTruthy();
          });
        }));
      });
  });
});

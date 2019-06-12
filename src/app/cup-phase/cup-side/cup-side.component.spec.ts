import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupSideComponent } from './cup-side.component';
import { cupFights, teams, teamFights } from '../cup-phase-full/test-scaffolding';
import { CupFightTileComponent } from '../../cup-fight/cup-fight-tile/cup-fight-tile.component';
import { TeamServiceSpy } from '../../team/team.service.spy';
import { Team } from '../../team/team';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { TeamFightServiceSpy } from '../../team-fight/team-fight.service.spy';
import { TeamFight } from '../../team-fight/team-fight';
import { TeamService } from '../../team/team.service';
import { TeamFightService } from '../../team-fight/team-fight.service';

class TeamServiceSpyMapped extends TeamServiceSpy {
  getReturnValuesMap: Map<number, Team> = new Map<number, Team>();
  get(id: number): Observable<Team> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }
}

class TeamFightServiceSpyMapped extends TeamFightServiceSpy {
  getReturnValuesMap: Map<number, TeamFight> = new Map<number, TeamFight>();
  get(id: number): Observable<TeamFight> {
    this.getValues.push(id);
    return of(this.getReturnValuesMap.get(id));
  }
}

describe('CupSideComponent', () => {
  let component: CupSideComponent;
  let fixture: ComponentFixture<CupSideComponent>;
  let teamService: TeamServiceSpyMapped;
  let teamFightService: TeamFightServiceSpyMapped;
  let html;

  beforeEach(async(() => {
    teamService = new TeamServiceSpyMapped();
    teamFightService = new TeamFightServiceSpyMapped();
    TestBed.configureTestingModule({
      declarations: [
        CupSideComponent,
        CupFightTileComponent
      ],
      providers: [
        { provide: TeamService, useValue: teamService },
        { provide: TeamFightService, useValue: teamFightService },
      ]
    })
      .compileComponents();
  }));

  describe("when there are 32 competitors and user is authorized", () => {
    beforeEach(() => {
      teamService.getListReturnValues.push([]);
      teams.forEach(team => {
        teamService.getReturnValuesMap.set(team.id, team);
      });
      teamFights.forEach(teamFight => {
        teamFightService.getReturnValuesMap.set(teamFight.id, teamFight);
      });
      fixture = TestBed.createComponent(CupSideComponent);
      component = fixture.componentInstance;
      component.cupFights = [
        [
          cupFights[1]
        ],
        [
          cupFights[3],
          cupFights[4]
        ],
        [
          cupFights[7],
          cupFights[8],
          cupFights[9],
          cupFights[10]
        ],
        [
          cupFights[15],
          cupFights[16],
          cupFights[17],
          cupFights[18],
          cupFights[19],
          cupFights[20],
          cupFights[21],
          cupFights[22]
        ]
      ];
      fixture.detectChanges();
      html = fixture.debugElement;
    });

    it("shows fights leading to this side finalist in this area", () => {
      expect(html.query(By.css("#cup-fight-2"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-4"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-5"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-8"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-9"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-10"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-11"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-16"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-17"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-18"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-19"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-20"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-21"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-22"))).toBeTruthy();
      expect(html.query(By.css("#cup-fight-23"))).toBeTruthy();
    });
    it("shows only leaf fights in leaf area", () => {
      let leafArea = html.query(By.css("#leaf-area"));
      expect(leafArea.query(By.css("#cup-fight-16"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-17"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-18"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-19"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-20"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-21"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-22"))).toBeTruthy();
      expect(leafArea.query(By.css("#cup-fight-23"))).toBeTruthy();

      expect(leafArea.query(By.css("#cup-fight-2"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-4"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-5"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-8"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-9"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-10"))).toBeFalsy();
      expect(leafArea.query(By.css("#cup-fight-11"))).toBeFalsy();
    });

    it("shows only semi-final fight in level-0 area", () => {
      let levelArea = html.query(By.css("#level-0"));
      expect(levelArea.query(By.css("#cup-fight-2"))).toBeTruthy();
      expect(levelArea.query(By.css("#cup-fight-4"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-5"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-8"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-9"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-10"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-11"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
    });

    it("shows only quarter-final fights in level-1 area", () => {
      let levelArea = html.query(By.css("#level-1"));
      expect(levelArea.query(By.css("#cup-fight-2"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-4"))).toBeTruthy("cf4");
      expect(levelArea.query(By.css("#cup-fight-5"))).toBeTruthy("cf5");
      expect(levelArea.query(By.css("#cup-fight-8"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-9"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-10"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-11"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
    });

    it("shows only eight-final fights in level-2 area", () => {
      let levelArea = html.query(By.css("#level-2"));
      expect(levelArea.query(By.css("#cup-fight-2"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-4"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-5"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-8"))).toBeTruthy();
      expect(levelArea.query(By.css("#cup-fight-9"))).toBeTruthy();
      expect(levelArea.query(By.css("#cup-fight-10"))).toBeTruthy();
      expect(levelArea.query(By.css("#cup-fight-11"))).toBeTruthy();
      expect(levelArea.query(By.css("#cup-fight-16"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-17"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-18"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-19"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-20"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-21"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-22"))).toBeFalsy();
      expect(levelArea.query(By.css("#cup-fight-23"))).toBeFalsy();
    });

    it("returns normal order when not reversed", () => {
      component.isReverseOrder = false;
      expect(component.getOrderNo(0)).toBe(0);
      expect(component.getOrderNo(1)).toBe(1);
      expect(component.getOrderNo(2)).toBe(2);
      expect(component.getOrderNo(3)).toBe(3);
    });

    it("returns reverse order when not reversed", () => {
      component.isReverseOrder = true;
      expect(component.getOrderNo(3)).toBe(0);
      expect(component.getOrderNo(2)).toBe(1);
      expect(component.getOrderNo(1)).toBe(2);
      expect(component.getOrderNo(0)).toBe(3);
    });

    it("calculates correct distance between fight tiles", () => {
      expect(component.getSeparator(1)).toEqual(1);
      expect(component.getSeparator(2)).toEqual(3);
      expect(component.getSeparator(3)).toEqual(7);
      expect(component.getSeparator(4)).toEqual(15);
    });
  });
});


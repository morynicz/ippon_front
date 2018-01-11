import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubFullComponent } from './club-full.component';

class ParamMapSpy {
  id: number;
  arg: string;
  get(s: string) {
    this.arg = s;
    return this.id;
  }
}

class SnapshotStub {
  parmaMap: ParamMapStub;
}

class RouteStub {
  snapshot: SnapshotStub;
}

class ClubServiceSpy {
  id: number;
  getClub(id: number): Observable<Club> {
    this.id = id;
    return new Observable<Club>();
  }
}

describe('ClubFullComponent', () => {
  let component: ClubFullComponent;
  let fixture: ComponentFixture<ClubFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ClubService, useClass: ClubServiceSpy },
        { provide: Route, useClass: RouteStub }
      ],
      declarations: [ClubFullComponent]
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
});

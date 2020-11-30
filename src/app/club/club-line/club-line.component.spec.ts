import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { ClubLineComponent } from './club-line.component';
import { Club } from '../club';

describe('ClubLineComponent', () => {
  let component: ClubLineComponent;
  let fixture: ComponentFixture<ClubLineComponent>;
  let expectedClub: Club;
  let html;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClubLineComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubLineComponent);
    component = fixture.componentInstance;

    expectedClub = {
      id: 1,
      name: 'C1',
      description: 'D1',
      city: 'Ci1',
      webpage: 'W1'
    };
    component.club = expectedClub;
    fixture.detectChanges();
    html = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("when created", () => {
    it('should display club name', () => {
      expect(html.textContent).toContain('C1');
    });
    it('should display club city', () => {
      expect(html.textContent).toContain('C1');
    });
    it('should provide link to the club', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('ng-reflect-router-link'))
        .toBe('/club/' + expectedClub.id);
    });
  });
});

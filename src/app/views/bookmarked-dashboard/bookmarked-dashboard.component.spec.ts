import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedDashboardComponent } from './bookmarked-dashboard.component';

describe('BookmarkedDashboardComponent', () => {
  let component: BookmarkedDashboardComponent;
  let fixture: ComponentFixture<BookmarkedDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkedDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarkedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

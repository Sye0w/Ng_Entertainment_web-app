import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardReusableComponent } from './media-card-reusable.component';

describe('MediaCardReusableComponent', () => {
  let component: MediaCardReusableComponent;
  let fixture: ComponentFixture<MediaCardReusableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCardReusableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaCardReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

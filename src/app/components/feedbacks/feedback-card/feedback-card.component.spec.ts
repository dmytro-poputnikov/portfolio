import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackCardComponent } from './feedback-card.component';

describe('FeedbackCardComponent', () => {
  let component: FeedbackCardComponent;
  let fixture: ComponentFixture<FeedbackCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FeedbackCardComponent]
    });
    fixture = TestBed.createComponent(FeedbackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

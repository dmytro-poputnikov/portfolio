import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWrapperComponent } from './section-wrapper.component';

describe('SectionWrapperComponent', () => {
  let component: SectionWrapperComponent;
  let fixture: ComponentFixture<SectionWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SectionWrapperComponent]
    });
    fixture = TestBed.createComponent(SectionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

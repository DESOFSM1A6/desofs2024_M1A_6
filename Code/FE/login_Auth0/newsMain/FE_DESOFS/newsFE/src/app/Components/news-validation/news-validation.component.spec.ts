import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsValidationComponent } from './news-validation.component';

describe('NewsValidationComponent', () => {
  let component: NewsValidationComponent;
  let fixture: ComponentFixture<NewsValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayServicesComponent } from './day-services.component';

describe('DayServicesComponent', () => {
  let component: DayServicesComponent;
  let fixture: ComponentFixture<DayServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

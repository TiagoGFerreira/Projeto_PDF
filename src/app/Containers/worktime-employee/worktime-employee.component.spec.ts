import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorktimeEmployeeComponent } from './worktime-employee.component';

describe('WorktimeEmployeeComponent', () => {
  let component: WorktimeEmployeeComponent;
  let fixture: ComponentFixture<WorktimeEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorktimeEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorktimeEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

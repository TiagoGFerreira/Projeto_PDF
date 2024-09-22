import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeServiceComponent } from './add-employee-service.component';

describe('AddEmployeeServiceComponent', () => {
  let component: AddEmployeeServiceComponent;
  let fixture: ComponentFixture<AddEmployeeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

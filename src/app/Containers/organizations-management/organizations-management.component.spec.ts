import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsManagementComponent } from './organizations-management.component';

describe('OrganizationsManagementComponent', () => {
  let component: OrganizationsManagementComponent;
  let fixture: ComponentFixture<OrganizationsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

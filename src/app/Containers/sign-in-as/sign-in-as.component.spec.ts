import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAsComponent } from './sign-in-as.component';

describe('SignInAsComponent', () => {
  let component: SignInAsComponent;
  let fixture: ComponentFixture<SignInAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInAsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

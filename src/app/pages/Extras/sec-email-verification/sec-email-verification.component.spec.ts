import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecEmailVerificationComponent } from './sec-email-verification.component';

describe('SecEmailVerificationComponent', () => {
  let component: SecEmailVerificationComponent;
  let fixture: ComponentFixture<SecEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecEmailVerificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

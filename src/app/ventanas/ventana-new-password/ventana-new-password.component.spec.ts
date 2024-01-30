import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaNewPasswordComponent } from './ventana-new-password.component';

describe('VentanaNewPasswordComponent', () => {
  let component: VentanaNewPasswordComponent;
  let fixture: ComponentFixture<VentanaNewPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaNewPasswordComponent]
    });
    fixture = TestBed.createComponent(VentanaNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

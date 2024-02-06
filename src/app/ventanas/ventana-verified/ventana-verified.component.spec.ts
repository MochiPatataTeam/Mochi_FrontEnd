import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaVerifiedComponent } from './ventana-verified.component';

describe('VentanaVerifiedComponent', () => {
  let component: VentanaVerifiedComponent;
  let fixture: ComponentFixture<VentanaVerifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaVerifiedComponent]
    });
    fixture = TestBed.createComponent(VentanaVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

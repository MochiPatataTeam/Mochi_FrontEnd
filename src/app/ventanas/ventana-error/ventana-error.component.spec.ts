import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaErrorComponent } from './ventana-error.component';

describe('VentanaErrorComponent', () => {
  let component: VentanaErrorComponent;
  let fixture: ComponentFixture<VentanaErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaErrorComponent]
    });
    fixture = TestBed.createComponent(VentanaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaReproduccionComponent } from './ventana-reproduccion.component';

describe('VentanaReproduccionComponent', () => {
  let component: VentanaReproduccionComponent;
  let fixture: ComponentFixture<VentanaReproduccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaReproduccionComponent]
    });
    fixture = TestBed.createComponent(VentanaReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

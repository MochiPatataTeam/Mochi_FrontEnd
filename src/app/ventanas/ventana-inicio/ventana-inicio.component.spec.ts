import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaInicioComponent } from './ventana-inicio.component';

describe('VentanaInicioComponent', () => {
  let component: VentanaInicioComponent;
  let fixture: ComponentFixture<VentanaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaInicioComponent]
    });
    fixture = TestBed.createComponent(VentanaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

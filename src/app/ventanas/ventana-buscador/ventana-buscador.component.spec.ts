import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaBuscadorComponent } from './ventana-buscador.component';

describe('VentanaBuscadorComponent', () => {
  let component: VentanaBuscadorComponent;
  let fixture: ComponentFixture<VentanaBuscadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaBuscadorComponent]
    });
    fixture = TestBed.createComponent(VentanaBuscadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaPerfilComponent } from './ventana-perfil.component';

describe('VentanaPerfilComponent', () => {
  let component: VentanaPerfilComponent;
  let fixture: ComponentFixture<VentanaPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaPerfilComponent]
    });
    fixture = TestBed.createComponent(VentanaPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

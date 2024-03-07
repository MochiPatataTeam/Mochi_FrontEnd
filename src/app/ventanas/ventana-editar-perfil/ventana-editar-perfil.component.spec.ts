import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEditarPerfilComponent } from './ventana-editar-perfil.component';

describe('VentanaEditarPerfilComponent', () => {
  let component: VentanaEditarPerfilComponent;
  let fixture: ComponentFixture<VentanaEditarPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaEditarPerfilComponent]
    });
    fixture = TestBed.createComponent(VentanaEditarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

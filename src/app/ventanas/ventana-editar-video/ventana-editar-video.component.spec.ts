import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEditarVideoComponent } from './ventana-editar-video.component';

describe('VentanaEditarVideoComponent', () => {
  let component: VentanaEditarVideoComponent;
  let fixture: ComponentFixture<VentanaEditarVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaEditarVideoComponent]
    });
    fixture = TestBed.createComponent(VentanaEditarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

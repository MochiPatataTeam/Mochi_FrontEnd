import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaSubirVideoComponent } from './ventana-subir-video.component';

describe('VentanaSubirVideoComponent', () => {
  let component: VentanaSubirVideoComponent;
  let fixture: ComponentFixture<VentanaSubirVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaSubirVideoComponent]
    });
    fixture = TestBed.createComponent(VentanaSubirVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

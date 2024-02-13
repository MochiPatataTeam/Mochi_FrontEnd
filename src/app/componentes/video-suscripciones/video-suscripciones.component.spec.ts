import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSuscripcionesComponent } from './video-suscripciones.component';

describe('VideoSuscripcionesComponent', () => {
  let component: VideoSuscripcionesComponent;
  let fixture: ComponentFixture<VideoSuscripcionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoSuscripcionesComponent]
    });
    fixture = TestBed.createComponent(VideoSuscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

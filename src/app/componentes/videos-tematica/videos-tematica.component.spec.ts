import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosTematicaComponent } from './videos-tematica.component';

describe('VideosTematicaComponent', () => {
  let component: VideosTematicaComponent;
  let fixture: ComponentFixture<VideosTematicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosTematicaComponent]
    });
    fixture = TestBed.createComponent(VideosTematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

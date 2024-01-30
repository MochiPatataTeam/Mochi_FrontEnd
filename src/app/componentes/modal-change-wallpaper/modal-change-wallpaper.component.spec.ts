import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeWallpaperComponent } from './modal-change-wallpaper.component';

describe('ModalChangeWallpaperComponent', () => {
  let component: ModalChangeWallpaperComponent;
  let fixture: ComponentFixture<ModalChangeWallpaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalChangeWallpaperComponent]
    });
    fixture = TestBed.createComponent(ModalChangeWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

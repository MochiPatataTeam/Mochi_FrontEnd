import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPopularesComponent } from './videos-populares.component';

describe('VideosPopularesComponent', () => {
  let component: VideosPopularesComponent;
  let fixture: ComponentFixture<VideosPopularesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosPopularesComponent]
    });
    fixture = TestBed.createComponent(VideosPopularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

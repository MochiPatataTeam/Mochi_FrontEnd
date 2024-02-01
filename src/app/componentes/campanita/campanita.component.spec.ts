import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanitaComponent } from './campanita.component';

describe('CampanitaComponent', () => {
  let component: CampanitaComponent;
  let fixture: ComponentFixture<CampanitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampanitaComponent]
    });
    fixture = TestBed.createComponent(CampanitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

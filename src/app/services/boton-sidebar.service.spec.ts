import { TestBed } from '@angular/core/testing';

import { BotonSidebarService } from './boton-sidebar.service';

describe('BotonSidebarService', () => {
  let service: BotonSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotonSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

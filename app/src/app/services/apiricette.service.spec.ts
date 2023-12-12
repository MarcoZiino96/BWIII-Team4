import { TestBed } from '@angular/core/testing';

import { APIricetteService } from './apiricette.service';

describe('APIricetteService', () => {
  let service: APIricetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIricetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

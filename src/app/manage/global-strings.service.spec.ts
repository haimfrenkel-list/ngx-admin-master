import { TestBed } from '@angular/core/testing';

import { GlobalStringsService } from './global-strings.service';

describe('GlobalStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalStringsService = TestBed.get(GlobalStringsService);
    expect(service).toBeTruthy();
  });
});

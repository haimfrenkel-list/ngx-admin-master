import { TestBed } from '@angular/core/testing';

import { PolicyHolderStringsService } from './policy-holder-strings.service';

describe('PolicyHolderStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicyHolderStringsService = TestBed.get(PolicyHolderStringsService);
    expect(service).toBeTruthy();
  });
});

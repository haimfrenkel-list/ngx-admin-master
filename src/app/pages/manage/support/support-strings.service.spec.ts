import { TestBed } from '@angular/core/testing';

import { SupportStringsService } from './support-strings.service';

describe('SupportStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupportStringsService = TestBed.get(SupportStringsService);
    expect(service).toBeTruthy();
  });
});

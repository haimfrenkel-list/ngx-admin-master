import { TestBed } from '@angular/core/testing';

import { AuthStringsService } from './auth-strings.service';

describe('AuthStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStringsService = TestBed.get(AuthStringsService);
    expect(service).toBeTruthy();
  });
});

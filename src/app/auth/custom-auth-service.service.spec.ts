import { TestBed } from '@angular/core/testing';

import { CustomAuthServiceService } from './custom-auth-service.service';

describe('CustomAuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomAuthServiceService = TestBed.get(CustomAuthServiceService);
    expect(service).toBeTruthy();
  });
});

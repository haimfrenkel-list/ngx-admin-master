import { TestBed } from '@angular/core/testing';

import { PendingNAlertsStringsService } from './pending-n-alerts-strings.service';

describe('PendingNAlertsStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PendingNAlertsStringsService = TestBed.get(PendingNAlertsStringsService);
    expect(service).toBeTruthy();
  });
});

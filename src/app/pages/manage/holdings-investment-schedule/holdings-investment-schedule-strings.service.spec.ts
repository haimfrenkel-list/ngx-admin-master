import { TestBed } from '@angular/core/testing';

import { HoldingsInvestmentScheduleStringsService } from './holdings-investment-schedule-strings.service';

describe('HoldingsInvestmentScheduleStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoldingsInvestmentScheduleStringsService = TestBed.get(HoldingsInvestmentScheduleStringsService);
    expect(service).toBeTruthy();
  });
});

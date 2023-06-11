import { TestBed } from '@angular/core/testing';

import { InvestmentOpportunitiesStringsService } from './investment-opportunities-strings.service';

describe('InvestmentOpportunitiesStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestmentOpportunitiesStringsService = TestBed.get(InvestmentOpportunitiesStringsService);
    expect(service).toBeTruthy();
  });
});

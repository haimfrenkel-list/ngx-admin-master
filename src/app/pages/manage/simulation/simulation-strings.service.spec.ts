import { TestBed } from '@angular/core/testing';

import { SimulationStringsService } from './simulation-strings.service';

describe('SimulationStringsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimulationStringsService = TestBed.get(SimulationStringsService);
    expect(service).toBeTruthy();
  });
});

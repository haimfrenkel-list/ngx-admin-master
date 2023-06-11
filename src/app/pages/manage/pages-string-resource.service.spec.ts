import { TestBed } from '@angular/core/testing';

import { PagesStringResourceService } from './pages-string-resource.service';

describe('PagesStringResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PagesStringResourceService = TestBed.get(PagesStringResourceService);
    expect(service).toBeTruthy();
  });
});

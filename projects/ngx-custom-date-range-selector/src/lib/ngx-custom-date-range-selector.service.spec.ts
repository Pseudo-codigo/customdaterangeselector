import { TestBed } from '@angular/core/testing';

import { NgxCustomDateRangeSelectorService } from './ngx-custom-date-range-selector.service';

describe('NgxCustomDateRangeSelectorService', () => {
  let service: NgxCustomDateRangeSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCustomDateRangeSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

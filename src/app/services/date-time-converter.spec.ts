import { TestBed } from '@angular/core/testing';

import { DateTimeConverter } from './date-time-converter';

describe('DateTimeConverter', () => {
  let service: DateTimeConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

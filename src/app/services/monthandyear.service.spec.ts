import { TestBed } from '@angular/core/testing';

import { MonthandyearService } from './monthandyear.service';

describe('MonthandyearService', () => {
  let service: MonthandyearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthandyearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CoutryandstateService } from './coutryandstate.service';

describe('CoutryandstateService', () => {
  let service: CoutryandstateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoutryandstateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

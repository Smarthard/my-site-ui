import { TestBed } from '@angular/core/testing';

import { ShikiRequestsService } from './shiki-requests.service';

describe('ShikiRequestsService', () => {
  let service: ShikiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShikiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

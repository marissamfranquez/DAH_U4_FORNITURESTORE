import { TestBed } from '@angular/core/testing';

import { FornitureStoreService } from './forniture-store.service';

describe('FornitureStoreService', () => {
  let service: FornitureStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornitureStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

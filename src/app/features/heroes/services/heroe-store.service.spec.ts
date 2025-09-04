import { TestBed } from '@angular/core/testing';

import { HeroeStoreService } from '../services/heroe-store.service';

describe('HeroeStoreService', () => {
  let service: HeroeStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroeStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

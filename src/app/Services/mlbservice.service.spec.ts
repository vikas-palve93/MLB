import { TestBed } from '@angular/core/testing';

import { MLBServiceService } from './mlbservice.service';

describe('MLBServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MLBServiceService = TestBed.get(MLBServiceService);
    expect(service).toBeTruthy();
  });
});

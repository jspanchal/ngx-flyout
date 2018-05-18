import { TestBed, inject } from '@angular/core/testing';

import { FlyoutService } from './flyout.service';

describe('FlyoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlyoutService]
    });
  });

  it('should be created', inject([FlyoutService], (service: FlyoutService) => {
    expect(service).toBeTruthy();
  }));
});

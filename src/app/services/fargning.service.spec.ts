import { TestBed, inject } from '@angular/core/testing';

import { FargningService } from './fargning.service';

describe('FargningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FargningService]
    });
  });

  it('should be created', inject([FargningService], (service: FargningService) => {
    expect(service).toBeTruthy();
  }));
});

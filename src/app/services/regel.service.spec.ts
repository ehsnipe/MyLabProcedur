import { TestBed, inject } from '@angular/core/testing';

import { RegelService } from './regel.service';

describe('RegelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegelService]
    });
  });

  it('should be created', inject([RegelService], (service: RegelService) => {
    expect(service).toBeTruthy();
  }));
});

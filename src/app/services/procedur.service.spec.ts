import { TestBed, inject } from '@angular/core/testing';

import { ProcedurService } from './procedur.service';

describe('ProcedurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcedurService]
    });
  });

  it('should be created', inject([ProcedurService], (service: ProcedurService) => {
    expect(service).toBeTruthy();
  }));
});

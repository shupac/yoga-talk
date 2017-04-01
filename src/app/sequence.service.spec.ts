/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SequenceService } from './sequence.service';

describe('SequenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SequenceService]
    });
  });

  it('should ...', inject([SequenceService], (service: SequenceService) => {
    expect(service).toBeTruthy();
  }));
});

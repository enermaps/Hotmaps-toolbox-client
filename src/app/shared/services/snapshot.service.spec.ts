import { TestBed, inject } from '@angular/core/testing';

import { SnapshotService } from './snapshot.service';

describe('SnapshotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          { provide: SnapshotService, useValue: SnapshotService }
        ],
    });
  });

  it('should be created', inject([SnapshotService], (service: SnapshotService) => {
    expect(service).toBeTruthy();
  }));
});
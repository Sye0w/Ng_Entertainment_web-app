import { TestBed } from '@angular/core/testing';

import { MediaFacadeService } from './media-facade.service';

describe('MediaFacadeService', () => {
  let service: MediaFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

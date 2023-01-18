import { TestBed } from '@angular/core/testing';

import { AvisClientsService } from './avis-clients.service';

describe('AvisClientsService', () => {
  let service: AvisClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

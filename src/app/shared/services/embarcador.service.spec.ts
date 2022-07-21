import { TestBed } from '@angular/core/testing';

import { EmbarcadorService } from './embarcador.service';

describe('EmbarcadorService', () => {
  let service: EmbarcadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmbarcadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

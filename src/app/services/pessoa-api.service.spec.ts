import { TestBed } from '@angular/core/testing';

import { PessoaApiService } from './pessoa-api.service';

describe('PessoaApiService', () => {
  let service: PessoaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PessoaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

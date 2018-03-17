import { TestBed, inject } from '@angular/core/testing';

import { JwtHelperWrapperService } from './jwt-helper-wrapper.service';

describe('JwtHelperWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHelperWrapperService]
    });
  });

  it('should be created', inject([JwtHelperWrapperService], (service: JwtHelperWrapperService) => {
    expect(service).toBeTruthy();
  }));
});

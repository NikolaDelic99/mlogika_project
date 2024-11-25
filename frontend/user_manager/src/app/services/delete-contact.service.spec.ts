import { TestBed } from '@angular/core/testing';

import { DeleteContactService } from './delete-contact.service';

describe('DeleteContactService', () => {
  let service: DeleteContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

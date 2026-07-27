import { TestBed } from '@angular/core/testing';

import { LearningTask } from './learning-task';

describe('LearningTask', () => {
  let service: LearningTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

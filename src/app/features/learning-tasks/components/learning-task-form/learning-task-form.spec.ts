import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningTaskForm } from './learning-task-form';

describe('LearningTaskForm', () => {
  let component: LearningTaskForm;
  let fixture: ComponentFixture<LearningTaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningTaskForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningTaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

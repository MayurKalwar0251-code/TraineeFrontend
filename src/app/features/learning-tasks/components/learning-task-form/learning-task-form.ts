import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LearningTask } from '../../models/learningTask';

@Component({
  selector: 'app-learning-task-form',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  standalone: true,
  templateUrl: './learning-task-form.html',
  styleUrl: './learning-task-form.css',
})
export class LearningFormComponent {

  private fb = inject(FormBuilder)

  @Input()
  learningTask?: LearningTask

  @Input()
  isSaving: boolean = false

  @Output()
  save = new EventEmitter<any>()

  @Output()
  cancel = new EventEmitter<void>()

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    expectedTechStack: ['', Validators.required],
    status: ['', Validators.required],
    dueDate: ['', Validators.required],
  })

  ngOnInit(): void {
    if (this.learningTask) {
      this.form.patchValue(this.learningTask)
    }
  }

  submit() {
    console.log("Submit functions")
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.save.emit(this.form.getRawValue())
    console.log("Submit functions called learning task : ", this.form.getRawValue())
  }

}

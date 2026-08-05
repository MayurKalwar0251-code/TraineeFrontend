import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskAssignment } from '../../models/taskAssignment';

@Component({
  selector: 'app-assignment-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './assignment-form.html',
  styleUrl: './assignment-form.css',
})
export class AssignmentFormComponent implements OnChanges {

  private fb = inject(FormBuilder)

  @Input()
  taskAssignment?: TaskAssignment

  @Input()
  isSaving: boolean = false

  @Output()
  save = new EventEmitter<any>()

  @Output()
  cancel = new EventEmitter<void>()

  form = this.fb.group({
    traineeId: [null as number | null, Validators.required],
    mentorId: [null as number | null, Validators.required],
    learningTaskId: [null as number | null, Validators.required],
    status: ['', Validators.required],
    remarks: [''],
    assignedDate: ['', Validators.required],
    dueDate: ['', Validators.required],
  });


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskAssignment'] && this.taskAssignment) {
      console.log("Have data : ", this.taskAssignment)
      this.form.patchValue(this.taskAssignment)
    }
    else {
      console.log("Dont have data ")
      this.form.reset({
          traineeId: null,
          mentorId: null,
          learningTaskId: null,
          status: '',
          remarks: '',
          assignedDate: '',
          dueDate: ''
        });
    }
  }

  submit() {
    console.log("Submit functions  1 : ", this.taskAssignment)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.save.emit(this.form.getRawValue())
    console.log("Submit functions called")
  }

}

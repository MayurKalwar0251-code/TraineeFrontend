
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mentor } from '../../models/mentor';

@Component({
  selector: 'app-mentor-form',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  standalone: true,
  templateUrl: './mentor-form.html',
  styleUrl: './mentor-form.css',
})
export class MentorFormComponent implements OnInit {

  private fb = inject(FormBuilder)

  @Input()
  mentor?: Mentor

  @Input()
  isSaving: boolean = false

  @Output()
  save = new EventEmitter<any>()

  @Output()
  cancel = new EventEmitter<void>()

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    expertise: ['', Validators.required],
    status: ['', Validators.required],
  })

  ngOnInit(): void {
    if (this.mentor) {
      this.form.patchValue(this.mentor)
    }
  }

  submit() {
    console.log("Submit functions")
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.save.emit(this.form.getRawValue())
    console.log("Submit functions called")
  }

}

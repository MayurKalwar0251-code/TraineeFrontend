import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trainee } from '../../models/trainee';

@Component({
  selector: 'app-trainee-form',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  standalone: true,
  templateUrl: './trainee-form.html',
  styleUrl: './trainee-form.css',
})
export class TraineeFormComponent implements OnInit {
  private fb = inject(FormBuilder)

  @Input()
  trainee?: Trainee

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
    password: ['', Validators.required],
    techStack: ['', Validators.required],
    status: ['', Validators.required],
  })

  ngOnInit(): void {
    if (this.trainee) {
      this.form.patchValue(this.trainee)
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

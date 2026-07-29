import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  computed,
  inject,
  signal,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { TraineeService } from '../../../trainees/services/trainee.service';
import { MentorService } from '../../../mentors/services/mentor.service';
import { LearningTask } from '../../models/learningTask';
import { Trainee } from '../../../trainees/models/trainee';
import { Mentor } from '../../../mentors/models/mentor';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-assignment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './assignment-dialog.html',
  styleUrl: './assignment-dialog.css'
})
export class AssignmentDialogComponent implements OnInit {

  private fb = inject(FormBuilder);

  private traineeService = inject(TraineeService);

  private mentorService = inject(MentorService);

  private cdr = inject(ChangeDetectorRef);

  private searchTraineeTimeout: any

  @Input()
  learningTask?: LearningTask;

  @Output()
  save = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<void>();

  trainees = signal<Trainee[]>([]);

  mentors = signal<Mentor[]>([]);

  selectedTrainee = signal<Trainee | null>(null);

  selectedMentor = signal<Mentor | null>(null);

  showTraineeDropdown = false
  showMentorDropdown = false

  form = this.fb.group({

    traineeSearch: [''],

    mentorSearch: [''],

    remarks: [''],

    assignedDate: [
      this.getToday(),
      Validators.required
    ]

  });

  traineeSearchSignal = toSignal(this.form.controls.traineeSearch.valueChanges.pipe(
    debounceTime(300),
    startWith('')
  ), { initialValue: '' });
  mentorSearchSignal = toSignal(this.form.controls.mentorSearch.valueChanges.pipe(
    debounceTime(300),
    startWith('')
  ), { initialValue: '' });

  filteredTrainees = computed(() => {

    const keyword =
      this.traineeSearchSignal()?.toLowerCase() ?? '';

      console.log("FILTERED : ", this.trainees().filter(x =>
        (`${x.firstName} ${x.lastName}`)
          .toLowerCase()
          .includes(keyword)
      ))
    return this.trainees().filter(x =>
      (`${x.firstName} ${x.lastName}`)
        .toLowerCase()
        .includes(keyword)
    );
  });

  filteredMentors = computed(() => {

    const keyword =
      this.mentorSearchSignal()?.toLowerCase() ?? '';

    return this.mentors().filter(x =>
      (`${x.firstName} ${x.lastName}`)
        .toLowerCase()
        .includes(keyword)
    );

  });

  openTraineeDropdown() {
    this.showTraineeDropdown = true
  }
  openMentorDropdown() {
    this.showMentorDropdown = true
  }
  closeTraineeDropdown() {
    setTimeout(() => {
      this.showTraineeDropdown = false
      this.cdr.detectChanges()
    }, 150);
  }
  closeMentorDropdown() {
    setTimeout(() => {
      this.showMentorDropdown = false
      this.cdr.detectChanges()
    }, 150);
  }

  ngOnInit(): void {

    this.loadTrainees();

    this.loadMentors();

  }

  private loadTrainees() {
    this.traineeService
      .getAllNoQuery()
      .subscribe(response => {
        this.trainees.set(response.data);
      });
  }

  private loadMentors() {
    this.mentorService
      .getAll()
      .subscribe(response => {
        this.mentors.set(response.data);
      });
  }

  selectTrainee(trainee: Trainee) {
    this.selectedTrainee.set(trainee);
    this.form.patchValue({
      traineeSearch:
        trainee.firstName +
        ' ' +
        trainee.lastName
    });
    this.showTraineeDropdown = false
  }

  selectMentor(mentor: Mentor) {
    this.selectedMentor.set(mentor);
    this.form.patchValue({
      mentorSearch:
        mentor.firstName +
        ' ' +
        mentor.lastName
    });
    this.showMentorDropdown = false
  }

  submit() {
    if (!this.selectedTrainee()) {
      alert('Please select a trainee.');
      return;
    }

    if (!this.selectedMentor()) {
      alert('Please select a mentor.');
      return;
    }

    this.save.emit({
      learningTaskId: this.learningTask?.id,
      traineeId: this.selectedTrainee()!.id,
      mentorId: this.selectedMentor()!.id,
      assignedDate:
        this.form.value.assignedDate,
      remarks:
        this.form.value.remarks
    });
  }

  private getToday(): string {
    return new Date()
      .toISOString()
      .split('T')[0];
  }
}
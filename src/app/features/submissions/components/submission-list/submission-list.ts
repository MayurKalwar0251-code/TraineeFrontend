import { Component, EventEmitter, inject, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { TaskAssignment } from '../../../assignments/models/taskAssignment';
import { Submission } from '../../models/submission';
import { TableColumn } from '../../../../shared/models/table-column';
import { TableAction } from '../../../../shared/models/table-action';
import { SubmissionService } from '../../services/submission.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { SubmissionFormComponent } from '../submission-form/submission-form';

@Component({
  selector: 'app-submission-list',
  imports: [DataTableComponent,ModalComponent,SubmissionFormComponent],
  standalone: true,
  templateUrl: './submission-list.html',
  styleUrl: './submission-list.css',
})
export class SubmissionListComponent implements OnChanges {

  private submissionService = inject(SubmissionService)

  @Input()
  assignment!: TaskAssignment | null

  @Output()
  close = new EventEmitter<void>()

  submissions = signal<Submission[]>([])

  loading = signal(false)

  showForm = signal(false)

  selectedSubmission = signal<Submission | null>(null)

  columns: TableColumn[] = [
    {
      key: "taskAssignmentId",
      header: "Task Assignment Id"
    },
    {
      key: "submissionUrl",
      header: "Submission Url"
    },
    {
      key: "notes",
      header: "Notes"
    },
    {
      key: "status",
      header: "Status"
    },
    {
      key: "submittedDate",
      header: "Submitted Date"
    },
  ]

  actions: TableAction<Submission>[] = [
    {
      label: 'View',
      icon: '👁️',
      onClick: submission => this.viewSubmission(submission)
    },
    {
      label: 'Delete',
      icon: '🗑️',
      onClick: submission => this.deleteSubmission(submission)
    },
  ]

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assignment'] && this.assignment) {
      this.loadSubmissions()
    }
  }

  loadSubmissions() {
    this.loading.set(true)

    this.submissionService.getSubmissionOfTask(this.assignment!.id).subscribe({
      next: response => {
        this.submissions.set(response.data)
        this.loading.set(false)
      },
      error: ()=> {
        this.loading.set(false)
      }
    })
  }

  openCreate() {
    this.selectedSubmission.set(null)
    this.showForm.set(true)
  }

  closeForm() {
    this.selectedSubmission.set(null)
    this.showForm.set(false)
  }

  saveSubmissionForm(request: any) {
    this.submissionService.create({
      ...request,
      taskAssignmentId: this.assignment!.id
    }).subscribe(()=> {
      this.closeForm()
      this.loadSubmissions()
    })
  }

  deleteSubmission(submission: Submission) {
    this.submissionService.delete(submission.id).subscribe(()=>{
      this.loadSubmissions()
    })
  }

  viewSubmission(submission: Submission) {
    console.log(submission)
  }
}
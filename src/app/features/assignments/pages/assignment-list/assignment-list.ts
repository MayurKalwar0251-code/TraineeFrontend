import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { TableColumn } from '../../../../shared/models/table-column';
import { TableAction } from '../../../../shared/models/table-action';
import { AssignmentService } from '../../services/assignment.service';
import { TaskAssignment } from '../../models/taskAssignment';
import { CreateTaskAssignment } from '../../models/createTaskAssignment';
import { AssignmentFormComponent } from '../../components/assignment-form/assignment-form';
import { SubmissionListComponent } from '../../../submissions/components/submission-list/submission-list';

@Component({
  selector: 'app-assignment-list',
  imports: [CommonModule, DataTableComponent, FormsModule, ModalComponent, AssignmentFormComponent, SubmissionListComponent],
  standalone: true,
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.css',
})
export class AssignmentListComponent {

  private taskAssignmentService = inject(AssignmentService)

  showForm = signal(false)

  isSaving = signal(false)

  selectedTaskAssignment = signal<TaskAssignment | null>(null)

  taskAssignments = signal<TaskAssignment[]>([])

  showSubmissionsDialog = signal(false)

  loading = signal(false)

  columns: TableColumn[] = [
    {
      key: 'traineeId',
      header: 'Trainee Id'
    },
    {
      key: 'mentorId',
      header: 'Mentor Id'
    },
    {
      key: 'learningTaskId',
      header: 'Learning Task Id'
    },
    {
      key: 'status',
      header: 'Status'
    },
    {
      key: 'remarks',
      header: 'Remarks'
    },
    {
      key: 'assignedDate',
      header: 'Assigned Date'
    },
    {
      key: 'dueDate',
      header: 'Due Date'
    },
  ]

  actions: TableAction<TaskAssignment>[] = [
    {
      label: "Edit",
      icon: "✏️",
      cssClass: "edit-btn",
      onClick: (taskAssignment) => this.openEdit(taskAssignment)
    },
    {
      label: "Submissions",
      icon: "📑",
      cssClass: "edit-btn",
      onClick: (taskAssignment) => this.openSubmission(taskAssignment)
    },
  ]

  ngOnInit(): void {
    this.loadTaskAssignments()
  }

  loadTaskAssignments() {
    this.loading.set(true)
    this.taskAssignmentService.getAll().subscribe({
      next: response => {
        const page = response.data
        this.taskAssignments.set(page)
        this.loading.set(false)
      },

      error: () => {
        this.loading.set(false)
      },

      complete: () => {
        this.loading.set(false)
      }
    })
    console.log("LOADING : ", this.loading)
  }

  openCreate() {
    console.log("DAAT A : ", this.selectedTaskAssignment())
    this.selectedTaskAssignment.set(null)
    this.showForm.set(true)

    console.log("DAAT A : ", this.selectedTaskAssignment())
  }

  openEdit(taskAssignment: TaskAssignment) {
    console.log("edit : ", taskAssignment)
    this.selectedTaskAssignment.set(taskAssignment)
    this.showForm.set(true)
  }

  deleteTrainee(taskAssignment: TaskAssignment) {
    console.log("delete ", taskAssignment);
    this.taskAssignmentService.delete(taskAssignment.id).subscribe(() => {
      this.loadTaskAssignments()
    })
  }

  openSubmission(taskAssignment: TaskAssignment) {
    this.selectedTaskAssignment.set(taskAssignment)
    this.showSubmissionsDialog.set(true)
  }

  closeSubmissionDialog() {
    this.showSubmissionsDialog.set(false)
    this.selectedTaskAssignment.set(null)
  }

  onEdit(id: number) {
    console.log("edit ", id)
    const taskAssignment = this.taskAssignments().find(x => x.id === id)
    console.log("TaskAssignment : ", taskAssignment)
    if (!taskAssignment) return
    this.selectedTaskAssignment.set(taskAssignment)
    this.showForm.set(true)
  }

  createTaskAssignment() {
    console.log("Create taskAssignment btn clicked");
    this.showForm.set(true)
  }

  closeForm() {
    this.showForm.set(false)
    this.selectedTaskAssignment.set(null)
  }

  saveTaskAssignment(data: CreateTaskAssignment) {
    const selected = this.selectedTaskAssignment()

    this.isSaving.set(true)
    if (selected) {
      this.taskAssignmentService.update(selected.id, {
        ...data,
        id: selected.id
      }).subscribe(() => {
        this.closeForm()
        this.loadTaskAssignments()
      })
    } else {
      this.taskAssignmentService.create(data).subscribe(() => {
        this.closeForm()
        this.loadTaskAssignments()
      })
    }
    this.isSaving.set(false)
  }

  onDelete(id: number) {
    console.log("delete ", id);
    this.taskAssignmentService.delete(id).subscribe(() => {
      this.loadTaskAssignments()
    })
  }

  changePage(page: number) {
    this.loadTaskAssignments()
  }
}

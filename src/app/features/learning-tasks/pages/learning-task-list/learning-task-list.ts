import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { TableColumn } from '../../../../shared/models/table-column';
import { LearningTaskService } from '../../services/learning-task.service';
import { LearningTask } from '../../models/learningTask';
import { CreateLearningTask } from '../../models/create-learningTask';
import { LearningFormComponent } from '../../components/learning-task-form/learning-task-form';
import { TableAction } from '../../../../shared/models/table-action';
import { AssignmentDialogComponent } from '../../components/assignment-dialog/assignment-dialog';
import { AssignmentService } from '../../../assignments/services/assignment.service';
import { CreateTaskAssignment } from '../../../assignments/models/createTaskAssignment';

@Component({
  selector: 'app-learning-task-list',
  imports: [CommonModule, DataTableComponent, FormsModule, ModalComponent, LearningFormComponent, AssignmentDialogComponent],
  standalone: true,
  templateUrl: './learning-task-list.html',
  styleUrl: './learning-task-list.css',
})
export class LearningTaskListComponent {
  private learningTaskService = inject(LearningTaskService)
  private taskAssignmentService = inject(AssignmentService)

  showForm = signal(false)

  isSaving = signal(false)

  selectedLearningTask = signal<LearningTask | null>(null)

  showAssignmentDialog = signal(false)

  learningTasks = signal<LearningTask[]>([])

  loading = signal(false)

  columns: TableColumn[] = [
    {
      key: 'title',
      header: 'Title'
    },
    {
      key: 'description',
      header: 'Description'
    },
    {
      key: 'expectedTechStack',
      header: 'Expected Tech Stack'
    },
    {
      key: 'status',
      header: 'Status'
    },
    {
      key: 'dueDate',
      header: 'Due Date'
    },
    {
      key: 'noOfAssignedTrainee',
      header: 'No Of Assigned Trainee'
    }
  ]

  actions: TableAction<LearningTask>[] = [
    {
      label: "Edit",
      icon: "✏️",
      cssClass: "edit-btn",
      onClick: (learningTask) => this.openEdit(learningTask)
    },
    {
      label: "Delete",
      icon: "🗑️",
      cssClass: "delete-btn",
      onClick: (learningTask) => this.deleteTrainee(learningTask)
    },
    {
      label: "Assign",
      icon: "🗑️",
      cssClass: "assign-btn",
      onClick: (learningTask) => this.openAssignDialog(learningTask)
    },
  ]

  ngOnInit(): void {
    this.loadLearningTasks()
  }

  loadLearningTasks() {
    this.loading.set(true)
    this.learningTaskService.getAll().subscribe({
      next: response => {
        const page = response.data
        this.learningTasks.set(page)
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
    this.selectedLearningTask.set(null)
    this.showForm.set(true)
  }

  openEdit(learningTask: LearningTask) {
    console.log("edit : ", learningTask)
    this.selectedLearningTask.set(learningTask)
    this.showForm.set(true)
  }

  deleteTrainee(learningTask: LearningTask) {
    console.log("delete ", learningTask);
    this.learningTaskService.delete(learningTask.id).subscribe(() => {
      this.loadLearningTasks()
    })
  }

  openAssignDialog(learningTask: LearningTask) {
    console.log("Assign task dialog", learningTask)
    this.selectedLearningTask.set(learningTask)
    this.showAssignmentDialog.set(true)
  }

  closeAssignmentDialog(){
    this.showAssignmentDialog.set(false)
    this.selectedLearningTask.set(null)
  }

  saveAssignment(request: CreateTaskAssignment){
    const data = {
      ...request,
      dueDate :  this.selectedLearningTask()?.dueDate ?? ""
    }
    console.log("SAving " ,data)
    this.taskAssignmentService.create(data).subscribe(()=>{
      this.loadLearningTasks()
    })
    this.closeAssignmentDialog()
  }

  onEdit(id: number) {
    console.log("edit ", id)
    const learningTask = this.learningTasks().find(x => x.id === id)
    console.log("LearningTask : ", learningTask)
    if (!learningTask) return
    this.selectedLearningTask.set(learningTask)
    this.showForm.set(true)
  }

  createLearningTask() {
    console.log("Create learningTask btn clicked");
    this.showForm.set(true)
  }

  closeForm() {
    this.showForm.set(false)
    this.selectedLearningTask.set(null)
  }

  saveLearningTask(data: CreateLearningTask) {
    const selected = this.selectedLearningTask()

    this.isSaving.set(true)
    if (selected) {
      this.learningTaskService.update(selected.id, {
        ...data,
        id: selected.id
      }).subscribe(() => {
        this.closeForm()
        this.loadLearningTasks()
      })
    } else {
      this.learningTaskService.create(data).subscribe(() => {
        this.closeForm()
        this.loadLearningTasks()
      })
    }
    this.isSaving.set(false)
  }

  onDelete(id: number) {
    console.log("delete ", id);
    this.learningTaskService.delete(id).subscribe(() => {
      this.loadLearningTasks()
    })
  }

  changePage(page: number) {
    this.loadLearningTasks()
  }
}

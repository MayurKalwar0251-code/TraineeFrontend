import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { MentorFormComponent } from '../../components/mentor-form/mentor-form';
import { MentorService } from '../../services/mentor.service';
import { TableColumn } from '../../../../shared/models/table-column';
import { CreateMentorRequest } from '../../models/create-mentor-request';
import { Mentor } from '../../models/mentor';
import { TableAction } from '../../../../shared/models/table-action';

@Component({
  selector: 'app-mentor-list',
  imports: [CommonModule, DataTableComponent, FormsModule, ModalComponent, MentorFormComponent],
  standalone: true,
  templateUrl: './mentor-list.html',
  styleUrl: './mentor-list.css',
})
export class MentorListComponent {
  private mentorService = inject(MentorService)
  private searchTimeout: any

  showForm = signal(false)

  isSaving = signal(false)

  selectedMentor = signal<Mentor | null>(null)

  mentors = signal<Mentor[]>([])

  loading = signal(false)

  columns: TableColumn[] = [
    {
      key: 'firstName',
      header: 'First Name'
    },
    {
      key: 'lastName',
      header: 'Last Name'
    },
    {
      key: 'email',
      header: 'Email'
    },
    {
      key: 'expertise',
      header: 'Expertise'
    },
    {
      key: 'status',
      header: 'Status'
    },
  ]

  actions: TableAction<Mentor>[] = [
    {
      label: "Edit",
      icon: "✏️",
      cssClass: "edit-btn",
      onClick: (mentor) => this.openEdit(mentor)
    },
    {
      label: "Delete",
      icon: "🗑️",
      cssClass: "delete-btn",
      onClick: (mentor) => this.deleteTrainee(mentor)
    },
  ]

  ngOnInit(): void {
    this.loadMentors()
  }

  loadMentors() {
    this.loading.set(true)
    this.mentorService.getAll().subscribe({
      next: response => {
        const page = response.data
        this.mentors.set(page)
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
    this.selectedMentor.set(null)
    this.showForm.set(true)
  }

  openEdit(mentor: Mentor) {
    console.log("edit : ", mentor)
    this.selectedMentor.set(mentor)
    this.showForm.set(true)
  }

  deleteTrainee(mentor: Mentor) {
    console.log("delete ", mentor);
    this.mentorService.delete(mentor.id).subscribe(() => {
      this.loadMentors()
    })
  }

  onEdit(id: number) {
    console.log("edit ", id)
    const mentor = this.mentors().find(x => x.id === id)
    console.log("Mentor : ", mentor)
    if (!mentor) return
    this.selectedMentor.set(mentor)
    this.showForm.set(true)
  }

  createMentor() {
    console.log("Create mentor btn clicked");
    this.showForm.set(true)
  }

  closeForm() {
    this.showForm.set(false)
    this.selectedMentor.set(null)
  }

  saveMentor(data: CreateMentorRequest) {
    const selected = this.selectedMentor()

    this.isSaving.set(true)
    if (selected) {
      this.mentorService.update(selected.id, {
        ...data,
        id: selected.id
      }).subscribe(() => {
        this.closeForm()
        this.loadMentors()
      })
    } else {
      this.mentorService.create(data).subscribe(() => {
        this.closeForm()
        this.loadMentors()
      })
    }
    this.isSaving.set(false)
  }

  onDelete(id: number) {
    console.log("delete ", id);
    this.mentorService.delete(id).subscribe(() => {
      this.loadMentors()
    })
  }

  changePage(page: number) {
    this.loadMentors()
  }
}

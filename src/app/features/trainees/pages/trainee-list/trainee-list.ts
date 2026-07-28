import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { TableColumn } from '../../../../shared/models/table-column';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { ModalComponent } from '../../../../shared/components/modal/modal';
import { TraineeFormComponent } from '../../components/trainee-form/trainee-form';
import { CreateTraineeRequest } from '../../models/create-trainee-request';

@Component({
  selector: 'app-trainee-list',
  imports: [CommonModule, DataTableComponent, FormsModule, PaginationComponent, ModalComponent, TraineeFormComponent],
  standalone: true,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.css',
})
export class TraineeListComponent implements OnInit {
  private traineeService = inject(TraineeService)
  private zone = inject(NgZone)
  private searchTimeout: any

  showForm = signal(false)

  isSaving = signal(false)

  selectedTrainee = signal<Trainee | null>(null)

  trainees = signal<Trainee[]>([])

  loading = signal(false)

  search = ''

  totalCount = 0

  pageNumber = 1

  pageSize = 10

  totalPages = 0

  hasNextPage = false

  hasPreviosPage = false

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
      key: 'techStack',
      header: 'Tech Stack'
    },
    {
      key: 'status',
      header: 'Status'
    },
  ]

  onSearch() {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.pageNumber = 1
      this.loadTrainees()
    }, 300)
  }

  ngOnInit(): void {
    this.loadTrainees()
  }

  loadTrainees() {
    this.loading.set(true)
    this.traineeService.getAll(this.pageNumber, this.pageSize, this.search).subscribe({
      next: response => {
        this.zone.run(() => {
          const page = response.data
          this.trainees.set(page.items)
          this.pageNumber = page.pageNumber
          this.pageSize = page.pageSize
          this.totalPages = page.totalPages
          this.totalCount = page.totalCount
          this.hasPreviosPage = page.hasPreviosPage
          this.hasNextPage = page.hasNextPage
          this.loading.set(false)
        })

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
    this.selectedTrainee.set(null)
    this.showForm.set(true)
  }

  onEdit(id: number) {
    console.log("edit ", id)
    const trainee = this.trainees().find(x => x.id === id)
    console.log("Trainee : ", trainee)
    if (!trainee) return
    this.selectedTrainee.set(trainee)
    this.showForm.set(true)
  }

  closeForm() {
    this.showForm.set(false)
    this.selectedTrainee.set(null)
  }

  saveTrainee(data: CreateTraineeRequest) {
    const selected = this.selectedTrainee()

    this.isSaving.set(true)
    if (selected) {
      this.traineeService.update(selected.id, {
        ...data,
        id: selected.id
      }).subscribe(() => {
        this.closeForm()
        this.loadTrainees()
      })
    } else {
      this.traineeService.create(data).subscribe(() => {
        this.closeForm()
        this.loadTrainees()
      })
    }
    this.isSaving.set(false)
  }

  onDelete(id: number) {
    console.log("delete ", id);
    this.traineeService.delete(id).subscribe(()=>{
      this.loadTrainees()
    })
  }

  changePage(page: number) {
    this.pageNumber = page
    this.loadTrainees()
  }
}

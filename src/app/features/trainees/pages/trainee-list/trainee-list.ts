import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { TraineeService } from '../../services/trainee.service';
import { Trainee } from '../../models/trainee';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table';
import { TableColumn } from '../../../../shared/models/table-column';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainee-list',
  imports: [CommonModule, DataTableComponent, FormsModule],
  standalone: true,
  templateUrl: './trainee-list.html',
  styleUrl: './trainee-list.css',
})
export class TraineeListComponent implements OnInit {
  private traineeService = inject(TraineeService)
  private zone = inject(NgZone)
  private cdr = inject(ChangeDetectorRef)

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

  onEdit(id: number) {
    console.log("edit ", id)
  }

  onDelete(id: number) {
    console.log("delete ", id);
  }
}

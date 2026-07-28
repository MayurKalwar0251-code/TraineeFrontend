import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  standalone: true,
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class PaginationComponent {
  @Input()
  pageNumber = 1

  @Input()
  totalPages = 1

  @Input()
  totalCount = 0

  @Output()
  pageChanged = new EventEmitter<number>()

  previous() {
    if (this.pageNumber > 1) {
      this.pageChanged.emit(this.pageNumber - 1)
    }
  }

  next() {
    if (this.pageNumber < this.totalPages) {
      this.pageChanged.emit(this.pageNumber + 1)
    }
  }

}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TableColumn } from '../../models/table-column';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTableComponent {

  @Input()
  columns: TableColumn[] = []

  @Input()
  data: any[] = []

  @Input()
  loading = false

  @Output()
  edit = new EventEmitter<number>()

  @Output()
  delete = new EventEmitter<number>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      console.log('DataTable Component - Loading state changed:', {
        previous: changes['loading'].previousValue,
        current: changes['loading'].currentValue,
        isFirstChange: changes['loading'].isFirstChange()
      });
    }
  }
}

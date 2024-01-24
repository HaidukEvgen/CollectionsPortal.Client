import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableUser } from '../../../models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
@Injectable()
export class AppTableComponent {
  @Input() users: TableUser[] = [];

  @Output() setOneEvent = new EventEmitter();
  @Output() setAllEvent = new EventEmitter();

  allChecked: boolean = false;
  displayedColumns: string[] = [
    'checked',
    'name',
    'email',
    'lastLogin',
    'status',
  ];

  constructor(private datePipe: DatePipe) {}

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'HH:mm:ss, d MMM, yyyy')!;
  }

  setAll(event: any) {
    this.setAllEvent.emit(event);
  }

  setOne(id: number, event: any) {
    this.setOneEvent.emit({ id, event });
  }
}

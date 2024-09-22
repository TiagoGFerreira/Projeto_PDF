import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
  @Input() title: string = 'Name';
  @Input() selectedDate: string = '';
  @Output() selectedDateChange = new EventEmitter<string>();

  constructor() { }

  onDateChange(newDate: string) {
    this.selectedDate = newDate;
    this.selectedDateChange.emit(newDate);
  }
}

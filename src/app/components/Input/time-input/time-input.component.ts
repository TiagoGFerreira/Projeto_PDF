import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.css'
})
export class TimeInputComponent {
  @Input() title: string = 'Hora';
  @Input() selectedTime: string = '';
  @Output() selectedTimeChange = new EventEmitter<string>();

  constructor() { }

  onTimeChange(newTime: string) {
    this.selectedTime = newTime;
    this.selectedTimeChange.emit(newTime);
  }
}
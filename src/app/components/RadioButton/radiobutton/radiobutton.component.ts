import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radiobutton',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './radiobutton.component.html',
  styleUrl: './radiobutton.component.css'
})
export class RadiobuttonComponent {
  @Input() options: string[] | undefined;
  @Input() checked: boolean | undefined;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() selectedOption: string | undefined;
  @Output() selectedOptionChange = new EventEmitter<string>();

  toggleRadio() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }
}

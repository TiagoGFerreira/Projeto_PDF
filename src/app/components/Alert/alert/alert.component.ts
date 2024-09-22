import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<string>();
  @Input() id: string = '';

  closeAlert(): void {
    this.close.emit();
  }

  showAlert = false;
  warningMessage = 'A default warning message.';

  onClose() {
    this.close.emit(this.id);
  }

  onCloseAlert() 
  {
    this.showAlert = false;
  }
}

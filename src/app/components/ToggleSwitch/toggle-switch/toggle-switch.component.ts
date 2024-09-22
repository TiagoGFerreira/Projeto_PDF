import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css'
})
export class ToggleSwitchComponent {
  isChecked: boolean = false;

  constructor() { }
}
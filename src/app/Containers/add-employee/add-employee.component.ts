import { Component } from '@angular/core';
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/EmployeeService';
import { AddEmployee } from '../../Models/Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports: [TextInputComponent, PrimaryButtonComponent, FormsModule]
})
export class AddEmployeeComponent {

  errorMessage: string = "";
  successMessage: string = "";

  addEmployee: AddEmployee = {
    email: '',
    organizationId: parseInt(localStorage.getItem('CurrentOrganizationId') || '0')
  }

  constructor(private router: Router, private employeeService: EmployeeService) { }

  AddEmployee() {
    this.employeeService.AddEmployee(this.addEmployee).subscribe(
      (response) => {
        if (response.code === 200) {
          this.successMessage = "The category was created with success";
          this.router.navigate(['/admin-employees']);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.errorMessage = "Validation error: " + error.message;
        } else if (error.status === 403) {
          this.errorMessage = "Forbidden error";
        } else if (error.status === 401) {
          this.errorMessage = "Unauthorized error";
        } else if (error.status === 500) {
          this.errorMessage = "Internal server error.";
        } else {
          this.errorMessage = "Unknown error: " + error.message;
        }
      }
    );
  }
}

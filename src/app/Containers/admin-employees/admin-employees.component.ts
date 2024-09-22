import { Component, OnInit } from '@angular/core';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/EmployeeService';
import { GetEmployee } from '../../Models/Employee';

@Component({
    selector: 'app-admin-employees',
    standalone: true,
    templateUrl: './admin-employees.component.html',
    styleUrl: './admin-employees.component.css',
    imports: [SecondaryButtonComponent, PrimaryButtonComponent]
})
export class AdminEmployeesComponent implements OnInit{
    
    employeesData: GetEmployee[] = [];
    adminOrganizationId: number = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');
    errorMessage: string = "";
    successMessage: string = "";
    origin = 'admin';

    constructor(private router: Router , private employeeService: EmployeeService ){}

    ngOnInit(): void {
        this.loadEmployees();
    }

    onCloseAlert() {
      this.errorMessage = "";
    }
    onCloseAlert2() {
      this.successMessage = "";
    }

    loadEmployees() {
        this.employeeService.GetAllEmployees(this.origin,this.adminOrganizationId).subscribe(
          (response) => {
            if (response.code === 200) {
              this.employeesData = response.data;
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
              this.errorMessage = "Unknow error: " + error.message;
            }
          }
        );
      }

      DeleteEmployee(employeeId: number) { //TODO Nao está a apagar os employess
        this.employeeService.DeleteEmployee(employeeId).subscribe(
          (response) => {
            if (response.code === 200) {
              this.successMessage = "The Service was deleted with success";
              this.loadEmployees();
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

    GoToAdd(){
        this.router.navigate(['/add-employee']);
    }

    GoToEdit(employeeId : number){
      localStorage.setItem('CurrentEmployeeId',employeeId.toString());
        this.router.navigate(['/edit-employee']);
    }
}

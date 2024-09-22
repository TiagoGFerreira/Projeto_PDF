import { Component, OnInit } from '@angular/core';
import { AddEmployeeService } from '../../Models/EmployeeService';
import { EmployeeServiceService } from '../../Services/EmployeeServiceService';
import { Router } from '@angular/router';
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { ServiceService } from '../../Services/ServiceService';
import { EmployeeService } from '../../Services/EmployeeService';
import { GetService } from '../../Models/Service';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";

@Component({
    selector: 'app-add-employee-service',
    standalone: true,
    templateUrl: './add-employee-service.component.html',
    styleUrl: './add-employee-service.component.css',
    imports: [DropdownComponent, PrimaryButtonComponent, SecondaryButtonComponent]
})
export class AddEmployeeServiceComponent implements OnInit{

  services: any[] = [];
  servicesData: GetService[] = [];
  employeeServices: any[] = [];

  employeeId = parseInt(localStorage.getItem('CurrentEmployeeId') || '0');

  origin = 'admin';
  adminOrganizationId: number = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');
  errorMessage: string = '';
  successMessage: string = '';

  addEmployeeService: AddEmployeeService = {
    employeeId: parseInt(localStorage.getItem('CurrentEmployeeId') || '0'),
    serviceId: 0
  }

  constructor(
    private router: Router,
    private employeeServiceService: EmployeeServiceService,
    private servicesService: ServiceService,
    private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.GetAllEmployeeServices();
    this.loadServices();
  }

  onSelectionChange(selectedServiceId: number) {
    this.addEmployeeService.serviceId = selectedServiceId;
  }

  AddEmployeeService() {
    this.employeeServiceService.AddEmployeeService(this.addEmployeeService).subscribe(
      (response) => {
        if (response.code === 200) {
          this.router.navigate(['/edit-employee']);
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


  loadServices() {
    this.servicesService.GetAllServices(this.origin, this.adminOrganizationId).subscribe(
      (response) => {
        if (response.code === 200) {
          for(var service of response.data)
            {
              if(this.employeeServices.find(e => e.serviceId === service.id) != undefined){
                this.servicesData.push(service);
              }
          }
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

  GetSingleEmployee() {
    this.employeeService.GetSingleEmployee(this.employeeId, this.origin).subscribe(
      (response) => {
        if (response.code === 200) {
          this.employeeServices = response.data.services;
          console.log(response);
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

  GetAllEmployeeServices(){
    this.employeeServiceService.GetAllEmployeeServices(this.employeeId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.employeeServices = response.data;
          console.log(response);
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

  DeleteEmployeeService(serviceId: number){
    var employeeServiceId = this.employeeServices.find(s=> s.serviceId === serviceId).id;
    this.employeeServiceService.DeleteEmployeeService(employeeServiceId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.GetAllEmployeeServices();
          this.router.navigate(['/edit-employee']);
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

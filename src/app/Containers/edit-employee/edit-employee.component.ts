import { Component, ElementRef, OnInit, Renderer2, viewChild } from '@angular/core';
import { WorktimeService } from '../../Services/WorktimeService';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router } from '@angular/router';
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { BaseDataService } from '../../Services/BaseDataService';
import { DaysOfWeek } from '../../Models/BaseData';
import { catchError, of } from 'rxjs';
import { GetWorktime } from '../../Models/Worktime';
import { EmployeeServiceService } from '../../Services/EmployeeServiceService';
import { ServiceService } from '../../Services/ServiceService';
import { GetService } from '../../Models/Service';
import { EmployeeService } from '../../Services/EmployeeService';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
  imports: [SecondaryButtonComponent, PrimaryButtonComponent, DropdownComponent]
})
export class EditEmployeeComponent implements OnInit {

  servicesData: GetService[] = [];
  employeeServices: any[] = [];

  origin = 'admin';
  adminOrganizationId: number = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');

  worktimesData: GetWorktime[] = [];
  employeeId: number = parseInt(localStorage.getItem('CurrentEmployeeId') || '0');
  errorMessage: string = '';
  successMessage: string = '';

  daysOfWeek: DaysOfWeek[] = [];

  constructor(private worktimeService: WorktimeService,
    private router: Router, private baseDataService: BaseDataService,
    private employeeServiceService: EmployeeServiceService,
    private servicesService: ServiceService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.baseDataService.GetAllDays().pipe(
      catchError(error => {
        console.error('Error fetching days:', error);
        return of();
      })
    ).subscribe(days => {
      if (Array.isArray(days.data)) {
        this.daysOfWeek = days.data.map((day: DaysOfWeek) => ({ id: day.id, name: day.name }));
      }

    });
    this.GetAllEmployeeServices();
    this.loadWorktimes();
    this.loadServices();
  }

  convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(remainingMinutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  loadWorktimes() {
    this.worktimeService.GetWorktimes(this.employeeId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.worktimesData = response.data;
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

  DeleteWorktime(worktimeId: number) {
    this.worktimeService.DeleteWorktime(worktimeId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.successMessage = "The worktime was deleted with success";
          this.loadWorktimes();
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
          // console.log(this.employeeServices);
          for(var service of response.data)
            {
              // service.checked = this.employeeServices.some(e => e.id === service.id);
              // service.employeeServiceId = this.employeeServices.find(e => e.id === service.id)?.id;
              console.log(this.employeeServices.find(e => e.serviceId === service.id));
              if(this.employeeServices.find(e => e.serviceId === service.id) != undefined){
                this.servicesData.push(service);
              }
          }
          // console.log(this.servicesData);
          // this.employeeServices = response.data;
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
        // Lidar com erros de solicitação HTTP
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

  GoTo() {
    this.router.navigate(['/worktime-employee']);
  }

  GoToAddEmployeeService(){
    this.router.navigate(['/add-employee-service']);
  }
}

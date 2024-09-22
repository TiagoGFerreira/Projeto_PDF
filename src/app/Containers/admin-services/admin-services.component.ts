import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { Router } from '@angular/router';
import { ServiceService } from '../../Services/ServiceService';
import { GetService } from '../../Models/Service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent]
})
export class AdminServicesComponent implements OnInit {

  servicesData: GetService[] = [];
  adminOrganizationId: number = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');
  errorMessage: string = "";
  successMessage: string = "";
  origin = 'admin';

  constructor(private router: Router, private servicesService: ServiceService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  onCloseAlert() {
    this.errorMessage = "";
  }
  onCloseAlert2() {
    this.successMessage = "";
  }

  loadServices() {
    this.servicesService.GetAllServices(this.origin, this.adminOrganizationId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.servicesData = response.data;
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

  DeleteService(serviceId: number) {
    this.servicesService.DeleteService(serviceId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.successMessage = "The Service was deleted with success";
          this.loadServices();
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

  GoToAdd() {
    localStorage.setItem('Action', 'add');
    this.router.navigate(['/add-edit-service']);
  }

  GoToEdit(serviceId: number) {
    localStorage.setItem('Action', 'edit');
    localStorage.setItem('CurrentServiceId', serviceId.toString());
    this.router.navigate(['/add-edit-service']);
  }
}

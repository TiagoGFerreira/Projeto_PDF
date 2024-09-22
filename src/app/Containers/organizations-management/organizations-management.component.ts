import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, RouterModule } from '@angular/router';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { OrganizationService } from '../../Services/OrganizationService';
import { AlertComponent } from "../../components/Alert/alert/alert.component";

@Component({
  selector: 'app-organizations-management',
  standalone: true,
  imports: [PrimaryButtonComponent, RouterModule, SecondaryButtonComponent,AlertComponent],
  templateUrl: './organizations-management.component.html',
  styleUrl: './organizations-management.component.css'
})
export class OrganizationsManagementComponent implements OnInit {
  organizationData: any[] = [];
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private router: Router, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.loadOrganizations(); 
  }

  onCloseAlert() {
    this.errorMessage = "";
  }
  onCloseAlert2() {
    this.successMessage = "";
  }

  loadOrganizations() {
    origin = 'master';
    this.organizationService.GetAllOrganizations(origin).subscribe(
      (response) => {
        if (response.code === 200) {
          this.organizationData = response.data;
        }
      },
      (error) => {
        console.error("Error loading organizations:", error);

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

  deleteOrganization(organizationId: number) {
    this.organizationService.DeleteOrganization(organizationId).subscribe(
      (response) => {
        if (response.code === 200) {
        this.successMessage = "The organization was deleted with success";
        this.loadOrganizations();
        }
      },
      (error) => {
        console.error("Error loading organizations:", error);

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

  GoTo(){
    localStorage.setItem('Action','add');
    this.router.navigate(['/add-organization']);
  }

  GoTo2(organizationId: number) {
    localStorage.setItem('CurrentOrganizationId',organizationId.toString());
    this.router.navigate(['/update-organization']);
  }

}

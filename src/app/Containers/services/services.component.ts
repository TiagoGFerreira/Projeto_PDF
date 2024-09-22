import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { ServiceService } from '../../Services/ServiceService'; 
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { AlertComponent } from "../../components/Alert/alert/alert.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [PrimaryButtonComponent, SecondaryButtonComponent,AlertComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  origin: string = ''; 
  organizationId: number = 0; 
  serviceData: any[] = [];
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private serviceService: ServiceService) { } 

  ngOnInit() {
    this.route.queryParams.subscribe(params => { 
      this.origin = params['origin'] || '';
      this.organizationId = Number(localStorage.getItem('CurrentOrganizationId'));
      this.loadServices();
    });
  }

  onCloseAlert() {
    this.errorMessage = "";
  }
  onCloseAlert2() {
    this.successMessage = "";
  }

  loadServices() {
    this.serviceService.GetAllServices(this.origin,this.organizationId).subscribe(
      (response) => {
        if (response.code === 200) {
          this.serviceData = response.data;
        }
      },
      (error) => {
        console.error("Error loading services:", error);

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
 
  GoTo(serviceId: number){
    this.router.navigate(['/available-times'], { queryParams: { origin: this.origin , serviceId: serviceId ,type: 'add'} });
  }
  

}

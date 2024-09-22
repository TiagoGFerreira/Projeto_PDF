import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgForOf } from '@angular/common';
import { TextInputComponent } from '../../components/Input/text-input/text-input.component';
import { SecondaryButtonComponent } from '../../components/Button/secondary-button/secondary-button.component';
import { DropdownComponent } from '../../components/DropDown/dropdown/dropdown.component';
import { AlertComponent } from '../../components/Alert/alert/alert.component';
import { OrganizationService } from '../../Services/OrganizationService';
import { ClientRequestService } from '../../Services/ClientRequestService';
import { AddClientRequest } from '../../Models/ClientRequest';

@Component({
  selector: 'app-search-organizations',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterModule,
    TextInputComponent,
    SecondaryButtonComponent,
    DropdownComponent,
    AlertComponent
  ],
  templateUrl: './search-organizations.component.html',
  styleUrls: ['./search-organizations.component.css']
})
export class SearchOrganizationsComponent implements OnInit {
  organizationData: any[] = [];
  filteredOrganizations: any[] = [];
  errorMessage: string = "";
  origin = 'search';
  originClient = 'client';
  selectedOrganization: any = null;
  categories: any[] = [];

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    private clientRequestService: ClientRequestService
  ) {}

  ngOnInit() {
    this.loadOrganizations();
  }

  onSelectionChange(event: any) {
    const category = event.target.value;
    this.filterByCategory(category);
  }

  onCloseAlert() {
    this.errorMessage = "";
  }

  loadOrganizations() {
    this.organizationService.GetAllOrganizations(this.origin).subscribe(
      (response) => {
        if (response.code === 200) {
          this.organizationData = response.data;
          this.filteredOrganizations = [...this.organizationData];
          this.extractCategories();
        }
      },
      (error) => {
        console.error("Error loading organizations:", error);
        this.handleErrorResponse(error);
      }
    );
  }

  CreateRequest(organizationId: number) {
    const clientRequest: AddClientRequest = {
      organizationId: organizationId
    };
    this.clientRequestService.AddRequest(clientRequest).subscribe(
      (response) => {
        this.goToSelectOrganization(this.originClient);
      },
      (error) => {
        console.error('Error creating request', error);
        this.handleErrorResponse(error);
      }
    );
  }

  filterByName(event: any) {
    const name = event.target.value.toLowerCase();
    console.log("Filtering by name:", name);
    this.filteredOrganizations = this.organizationData.filter(org => 
      org.Name.toLowerCase().includes(name)
    );
    console.log("Filtered organizations:", this.filteredOrganizations);
  }
  
  filterByCategory(category: string) {
    console.log("Filtering by category:", category);
    this.filteredOrganizations = category ? 
      this.organizationData.filter(org => org.Category.toLowerCase() === category.toLowerCase()) :
      [...this.organizationData];
    console.log("Filtered organizations:", this.filteredOrganizations);
  }

  extractCategories() {
    this.categories = [...new Set(this.organizationData.map(org => org.Category))];
  }

  handleErrorResponse(error: any) {
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

  openDetailsModal(organization: any) {
    this.selectedOrganization = organization;
  }

  closeDetailsModal() {
    this.selectedOrganization = null;
  }

  trackByOrganization(index: number, organization: any) {
    return organization.id;
  }

  goToSelectOrganization(origin: string): void {
    localStorage.setItem('origin', origin);
    if(origin === 'master'){
        this.router.navigate(['/master']);
    }
    else {
        this.router.navigate(['/select-organization'], { queryParams: { origin: origin } });
    }
}
}

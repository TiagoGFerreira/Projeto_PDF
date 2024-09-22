import { Component, OnInit, Input } from '@angular/core';
import { ClientRequestService } from '../../Services/ClientRequestService';
import { OrganizationService } from '../../Services/OrganizationService';
import { GetOrganization } from '../../Models/Organization';
import { AcceptClientRequest } from '../../Models/ClientRequest';

@Component({
  selector: 'app-client-requests',
  templateUrl: './client-requests.component.html',
  styleUrls: ['./client-requests.component.css']
})
export class ClientRequestsComponent implements OnInit {
  @Input() organization: any;
  clientRequests: any[] = [];
  errorMessage: string = "";
  adminOrganizations: GetOrganization[] = [];

  constructor(
    private organizationService: OrganizationService,
    private clientRequestService: ClientRequestService
  ) {}

  ngOnInit() {
    const adminId = this.getAdminId(); // Method to get the logged-in admin's ID
    this.loadAdminOrganizations(adminId);
  }
  
  getAdminId(): string {
    const adminsString = localStorage.getItem('admins');
    if (adminsString) {
      const admins: any[] = JSON.parse(adminsString);
      if (admins.length > 0) {
        return admins[0].id.toString(); // Assuming the admin ID is the first element in the array
      }
    }
    return "error";
  }

  //filter
  loadAdminOrganizations(adminId: string) {
    this.organizationService.GetAllOrganizations('admin').subscribe(
      (response: { data: GetOrganization[]; }) => { // Use GetOrganization interface here
        this.adminOrganizations = response.data;
        this.loadClientRequests();
      },
      (error: any) => {
        console.error("Error loading admin organizations:", error);
        this.errorMessage = "Error loading admin organizations.";
      }
    );
  }

  loadClientRequests() {
    this.clientRequestService.GetAllRequests().subscribe(
      (response: { data: any[]; }) => {
        const clientRequests: any[] = response.data; // Assuming the response has a different type
        this.filterRequestsByAdminOrganizations(clientRequests);
      },
      (error: any) => {
        console.error("Error loading client requests:", error);
        this.errorMessage = "Error loading client requests.";
      }
    );
  }
  
  filterRequestsByAdminOrganizations(clientRequests: any[]) {
    if (this.adminOrganizations && this.adminOrganizations.length > 0) {
      const adminOrgIds = this.adminOrganizations.map(org => org.id);
      this.clientRequests = clientRequests.filter(request => {
        // Include only requests that belong to admin organizations
        if (!adminOrgIds.includes(request.organizationId)) {
          return false;
        }
        // Include only requests that haven't been accepted or rejected
        return request.accepted === 0; // Assuming 0 means pending
      });
    }
  }
  
  //verificar valores
  acceptRequestData: AcceptClientRequest = { accepted: 1 };
  rejectRequestData: AcceptClientRequest = { accepted: 2 };

  approveRequest(request: any) {
    this.clientRequestService.AcceptRequest(request.id, this.acceptRequestData);
    //error verification
    console.log(`Approving request for ${request.clientName}`);
  }

  rejectRequest(request: any) {
    this.clientRequestService.AcceptRequest(request.id, this.rejectRequestData);
    //error verification
    console.log(`Rejecting request for ${request.clientName}`);
  }
}

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ClientRequestsComponent } from './client-requests.component';

// describe('CLientRequestsComponent', () => {
//   let component: ClientRequestsComponent;
//   let fixture: ComponentFixture<ClientRequestsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [ClientRequestsComponent]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(ClientRequestsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


import { Component, OnInit, Input } from '@angular/core';
import { ClientRequestService } from '../../services/client-request.service';

@Component({
  selector: 'app-client-requests',
  templateUrl: './client-requests.component.html',
  styleUrls: ['./client-requests.component.css']
})
export class ClientRequestsComponent implements OnInit {
  @Input() organization: any;
  clientRequests: any[] = [];
  errorMessage: string = "";

  constructor(private clientRequestService: ClientRequestService) { }

  ngOnInit() {
    this.loadClientRequests();
  }

  loadClientRequests() {
    this.clientRequestService.GetAllRequests(this.organization.id).subscribe(
      (response) => {
        if (response.success) {
          this.clientRequests = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error("Error loading client requests:", error);
        this.errorMessage = "Error loading client requests.";
      }
    );
  }

  approveRequest(id: number) {
    this.clientRequestService.AcceptRequest(id, true).subscribe(
      (response) => {
        if (response.success) {
          this.loadClientRequests();  // Refresh the list after approving
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error("Error approving client request:", error);
        this.errorMessage = "Error approving client request.";
      }
    );
  }

  rejectRequest(id: number) {
    this.clientRequestService.AcceptRequest(id, false).subscribe(
      (response: { success: any; message: string; }) => {
        if (response.success) {
          this.loadClientRequests();  // Refresh the list after rejecting
        } else {
          this.errorMessage = response.message;
        }
      },
      (error: any) => {
        console.error("Error rejecting client request:", error);
        this.errorMessage = "Error rejecting client request.";
      }
    );
  }
}

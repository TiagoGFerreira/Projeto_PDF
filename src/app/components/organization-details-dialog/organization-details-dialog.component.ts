import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ClientRequestService } from '../../Services/ClientRequestService';
import { AddClientRequest } from '../../Models/ClientRequest';


@Component({
  selector: 'app-organization-details-dialog',
  standalone: true,
  imports: [],
  templateUrl: './organization-details-dialog.component.html',
  styleUrl: './organization-details-dialog.component.css'
})
export class OrganizationDetailsDialogComponent {
  @Input() organization: any;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  constructor(
    private clientRequestService: ClientRequestService
  ) {}



  onRequestClient(): void {
    const requestData: AddClientRequest = {
      organizationId: this.organization.id 
    };

    this.clientRequestService.AddRequest(requestData).subscribe(response => {
      console.log('Requesting to be a client for ${this.organization.name}', response);
      this.close.emit();
    }, error => {
      console.error('Error requesting to be a client', error);
    });
  }
}

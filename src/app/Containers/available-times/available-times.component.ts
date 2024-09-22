import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { AppointmentService } from "../../Services/AppointmentService";
import { Router, ActivatedRoute } from '@angular/router';
import { AppointmentSwitchRequestService } from "../../Services/AppointmentSwitchRequestService";
import { AppointmentSwitchRequest } from "../../Models/AppointmentSwitchRequest";
import { AlertComponent } from '../../components/Alert/alert/alert.component';
import { Appointment } from '../../Models/Appointment';
import { EditAppointment } from "../../Models/Appointment"
import { ServiceResponse } from '../../Models/ServiceResponse';

@Component({
    selector: 'app-available-times',
    standalone: true,
    templateUrl: './available-times.component.html',
    styleUrls: ['./available-times.component.css'],
    imports: [SecondaryButtonComponent, PrimaryButtonComponent,AlertComponent]
})
export class AvailableTimesComponent implements OnInit {
    origin: string = '';
    startDate: number = 0;
    endDate: number = 0;
    freeTimesData: any[] = [];
    errorMessage: string = '';
    successMessage: string = '';
    organizationId: number = 0;
    appointmentId: number = 0;
    type: string = '';
    clients: any[] = [];
    clientId: number = 0;
    serviceId: number = 0;
    appointmentStartTime: number = 0;


    constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService, private appointmentSwitchRequestService: AppointmentSwitchRequestService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.origin = params['origin'] || '';
            this.type = params['type'];
            this.serviceId = params['serviceId'];
            this.appointmentId = params['appointmentId'];
            this.appointmentStartTime = params['startTime'];
            
            this.startDate = Number(localStorage.getItem('startDate'));
            this.endDate = Number(localStorage.getItem('endDate'));
            this.organizationId = Number(localStorage.getItem('CurrentOrganizationId'));

            console.log(this.startDate);
            console.log(this.endDate);
            

            const clientsString = localStorage.getItem('clients');
            this.clients = clientsString ? JSON.parse(clientsString) : [];
            if (this.clients.length > 0) {
                this.clientId = this.clients[0].id;
            }
            this.loadFreeTimesSlots();
        });
    }

    loadFreeTimesSlots() {
        this.appointmentService.GetFreeTimeslots(this.organizationId, this.startDate, this.endDate).subscribe(
            response => {
                if (response && response.code === 200) {
                    this.freeTimesData = response.data;
                } else {
                    console.error("Unexpected response or response code: ", response);
                }
            },
            error => {
                this.errorMessage = this.getErrorMessage(error);
                console.error("Error loading free time slots: ", error);
            }
        );
    }

    addAppointment(dateTime: number, serviceId: number, employeeId: number, clientId: number) {
        const appointmentData: Appointment = {
            dateTime: dateTime,
            serviceId: serviceId,
            employeeId: employeeId,
            clientId: clientId,
            origin: this.origin
        };
        
        this.appointmentService.AddAppointment(appointmentData).subscribe(
            (response: ServiceResponse) => {
                if (response.code === 200) {
                    this.GoToCalendar;
                } else {
                    this.errorMessage = 'Error adding appointment: ' + response.message;
                }
            },
            (error) => {
                this.errorMessage = this.getErrorMessage(error);
                console.error("Error adding appointment: ", error);
            }
        );
        this.GoToCalendar();
    }

    EditAppointment(id: number,dateTime: number) {
        const editappointmentData: EditAppointment = {
            dateTime: dateTime,
        };
        
        this.appointmentService.EditAppointment(id,editappointmentData).subscribe(
            (response: ServiceResponse) => {
                if (response.code === 200) {
                    this.GoToCalendar;
                } else {
                    this.errorMessage = 'Error adding appointment: ' + response.message;
                }
            },
            (error) => {
                this.errorMessage = this.getErrorMessage(error);
                console.error("Error adding appointment: ", error);
            }
        );
        this.GoToCalendar();
    }

    SwitchRequest(receiverAppointmentId: number | null, origin: string) {
        if (!this.appointmentId) {
            this.errorMessage = "Receiver Appointment ID is required.";
            return;
        }
        const switchRequestData: AppointmentSwitchRequest = {
            receiverAppointmentId: receiverAppointmentId ?? 0,
            senderAppointmentId: this.appointmentId, 
            origin: origin
        };
        

        console.log(switchRequestData);
        this.appointmentSwitchRequestService.AddAppointmentSwitchRequest(switchRequestData).subscribe(
            response => {
                if (response && response.code === 200) {
                    this.GoToCalendar();
                }
            },
            error => {
                this.errorMessage = this.getErrorMessage(error);
                console.error("Erro ao adicionar switch request: ", error);
            }
        );
        this.GoToCalendar();
    }
    

    getErrorMessage(error: any): string {
        switch (error.status) {
            case 400:
                return 'Validation error: ' + error.message;
            case 403:
                return 'Forbidden error';
            case 401:
                return 'Unauthorized error';
            case 500:
                return 'Internal server error.';
            default:
                return 'Unknown error: ' + error.message;
        }
    }

    unixTimestampToTimeString(timestamp: number): string {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
      }

    onCloseAlert() {
        this.errorMessage = '';
      }
    
      onCloseAlert2() {
        this.errorMessage = '';
      }

      GoToCalendar()
      {
        this.router.navigate(['calendar'] , { queryParams: { origin: this.origin } });
      }  
      
}

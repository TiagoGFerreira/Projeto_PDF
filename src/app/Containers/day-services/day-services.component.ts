import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimaryButtonComponent } from '../../components/Button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../components/Button/secondary-button/secondary-button.component';
import { AppointmentService } from '../../Services/AppointmentService';
import { AlertComponent } from '../../components/Alert/alert/alert.component';

@Component({
  selector: 'app-day-services',
  standalone: true,
  templateUrl: './day-services.component.html',
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, AlertComponent],
  styleUrls: ['./day-services.component.css']
})
export class DayServicesComponent implements OnInit {
  selectedDate: Date = new Date();
  origin: string = '';
  startOfDayTimestamp: number = 0;
  endOfDayTimestamp: number = 0;
  appointmentData: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.origin = params['origin'] || '';
      this.selectedDate = params['date'] ? new Date(params['date']) : new Date();
      
      this.setDayTimestamps(this.selectedDate);

      localStorage.setItem('startDate', this.startOfDayTimestamp.toString());
      localStorage.setItem('endDate', this.endOfDayTimestamp.toString());

      this.loadAppointments();
    });
  }

  loadAppointments() {
    this.appointmentService.GetAppointments(this.startOfDayTimestamp, this.endOfDayTimestamp, this.origin).subscribe(
      response => {
        if (response && response.code === 200) {
          this.appointmentData = response.data; 
        } else {
          console.error("Unexpected response or response code: ", response);
        }
      },
      error => {
        this.errorMessage = this.getErrorMessage(error);
        console.error("Error loading appointments: ", error);
      }
    );
  }

  deleteAppointment(appointmentId: number) {
    this.appointmentService.DeleteAppointment(appointmentId,this.origin).subscribe(
      response => {
        if (response.code === 200) {
          this.loadAppointments();
        } else {
          console.error("Unexpected response code: ", response.code);
        }
      },
      error => {
        this.errorMessage = this.getErrorMessage(error);
        console.error("Error deleting appointment: ", error);
      }
    );
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

  setDayTimestamps(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    this.startOfDayTimestamp = Math.floor(startOfDay.getTime() / 1000); 

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    this.endOfDayTimestamp = Math.floor(endOfDay.getTime() / 1000); 
  }

  GoToAvailableTimes(appointmentId:number,startTime : number) {
    this.router.navigate(['/available-times'], { queryParams: { origin: this.origin, appointmentId: appointmentId, startTime: startTime, type: 'edit' } });
  }

  GoToServices() {
    this.router.navigate(['/services'], { queryParams: { origin: this.origin } });
  }

  onCloseAlert() {
    this.errorMessage = '';
  }

  onCloseAlert2() {
    this.errorMessage = '';
  }
}

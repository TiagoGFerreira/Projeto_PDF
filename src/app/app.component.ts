import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, input } from '@angular/core';
import { PrimaryButtonComponent } from './components/Button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from './components/Button/secondary-button/secondary-button.component';
import { TextInputComponent } from './components/Input/text-input/text-input.component';
import { DateInputComponent } from './components/Input/date-input/date-input.component';
import { ToggleSwitchComponent } from './components/ToggleSwitch/toggle-switch/toggle-switch.component';
import { DropdownComponent } from './components/DropDown/dropdown/dropdown.component';
import { AlertComponent } from './components/Alert/alert/alert.component';
import { TimeInputComponent } from './components/Input/time-input/time-input.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RadiobuttonComponent } from './components/RadioButton/radiobutton/radiobutton.component';
import { Router, RouterOutlet } from '@angular/router';
import { AppointmentService } from './Services/AppointmentService';
import { Appointment, FreeTimeslots } from './Models/Appointment';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './Services/EmployeeService';
import { AddEmployee, GetEmployee } from './Models/Employee';
import { AcceptAppointmentSwitchRequest, AppointmentSwitchRequest } from './Models/AppointmentSwitchRequest';
import { Me } from './Models/Auth';
import { Country, DaysOfWeek, NotificationType, PostalCode } from './Models/BaseData';
import { GetCategory } from './Models/Category';
import { GetClientRequest } from './Models/ClientRequest';
import { GetEmployeeService } from './Models/EmployeeService';
import { Mfa } from './Models/Mfa';
import { GetNotification } from './Models/Notification';
import { GetOrganization } from './Models/Organization';
import { GetWorktime } from './Models/Worktime';
import { SignInComponent } from './Containers/sign-in/sign-in.component';
import { SignUpComponent } from './Containers/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './Containers/recover-password/recover-password.component';
import { NewPasswordComponent } from './Containers/new-password/new-password.component';
import { MasterComponent } from './Containers/master/master.component';
import { SignInAsComponent } from './Containers/sign-in-as/sign-in-as.component';
import { CategoriesManagementComponent } from './Containers/categories-management/categories-management.component';
import { AddCategoryComponent } from './Containers/add-category/add-category.component';
import { NotificationService } from './Services/NotificationService';
import { AppointmentSwitchRequestService } from './Services/AppointmentSwitchRequestService';
import { AcceptClientRequest } from './Models/ClientRequest'
import { ClientRequestService } from './Services/ClientRequestService';
import { error } from 'console';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HttpClientModule,
    DropdownComponent,
    MasterComponent,
    TimeInputComponent,
    SecondaryButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})

export class AppComponent implements OnInit {

  notificationsData: GetNotification[] = [];

  title = 'TimeCraft';

  alerts: { id: string, message: string, type: string }[] = [];



  selectedOption: string | undefined;
  errorMessage: string = '';

  onOptionSelected(option: string) {
    this.selectedOption = option;

  }

  onSelectionChange(Id: number) {
  }

  showAlert = true; 
  hideAlert(id: string) {
    var button = document.getElementById(id);
    if (button !== null && button.parentNode !== null) {
      button.parentNode.removeChild(button);
    }
  }

  selectedRadioValue: string = "";

  onOptionChange(selectedOption: string) {
    this.selectedRadioValue = selectedOption;
    console.log("Selected option:", selectedOption); 
  }

  showAlertComponent = true;

  constructor(private router: Router, private appointmentService: AppointmentService, private employeeService: EmployeeService, private notificationService: NotificationService, private appointmentSwitchRequestService : AppointmentSwitchRequestService, private clientRequestService : ClientRequestService) { }

  ngOnInit(): void {

    this.loadNotifications();
  }


  disallowedUrls: string[] = ['/sign-in', '/sign-up', '/sign-in-as','/recover-password',];

  isAllowedRoute(): boolean {
    const currentUrl = this.router.url;
    return !this.disallowedUrls.some(url => currentUrl.startsWith(url));
  }

  down = false;
  toggleNotifi(): void {
    const box = document.getElementById('box');
    if (box) {
        if (this.down) {
            box.style.height = '0px';
            box.style.opacity = '0';
            this.down = false;
        } else {
            box.style.height = '510px';
            box.style.opacity = '1';
            this.down = true;

        }
    }
}

loadNotifications() {
  this.notificationService.GetNotifications().subscribe(
      (response) => {
          if (response.code === 200) {
              this.notificationsData = response.data.filter((notification: any) => notification.read === 0);
          }
      },
      (error) => {
          console.error("Error loading organizations:", error);
      }
  );
}


  NumNotifications(): number {
    let count = 0;
    for (const notification of this.notificationsData) {
      if (notification.read === 0) {
        count++;
      }
    }
    return count;
  }

  get numNot(): number {
    return this.NumNotifications();
  }


  responseClientRequest(requestId: number, accepted: number) {
    const requestData: AcceptClientRequest = {
        accepted: accepted
    };

    this.clientRequestService.AcceptRequest(requestId, requestData).subscribe(
        (response) => {
            if (response.code === 200) {
              this.loadNotifications();
            }
        },
        (error) => {
            console.error("Error accepting request:", error);
        }
    );
}

responseClientSwitchRequest(requestId: number, accepted: number) {
  const requestData: AcceptAppointmentSwitchRequest = {
      accept: accepted
  };

  this.appointmentSwitchRequestService.AcceptAppointmentSwitchRequest(requestId, requestData).subscribe(
      (response) => {
          if (response.code === 200) {
            this.loadNotifications();
          }
      },
      (error) => {
          console.error("Error accepting request:", error);
      }
  );
}

  markAsRead(notificaitoniId : number)
  {
    this.notificationService.MarkAsRead(notificaitoniId).subscribe(
      (response) => {
        if (response.code === 200) {
          console.log("The message was read");
        }
    },
    (error) => {
        console.error("Error accepting request:", error);
    }
);
}
}

import { Component , OnInit  } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from "../../components/Alert/alert/alert.component";

@Component({
    selector: 'app-sign-in-as',
    standalone: true,
    templateUrl: './sign-in-as.component.html',
    styleUrl: './sign-in-as.component.css',
    imports: [PrimaryButtonComponent,RouterModule,AlertComponent]
})
export class SignInAsComponent implements OnInit {
    errorMessage: string = "";

    onCloseAlert() {
        this.errorMessage = "";
      }

    isMaster: number = 0; 
    admins: any[] = []; 
    employees: any[] = []; 
    clients: any[] = []; 
    token: string = '';

    constructor(private router: Router) { }
    
    ngOnInit(): void {
        const isMasterString = localStorage.getItem('isMaster');
        this.isMaster = isMasterString ? +isMasterString : 0;

        const adminsString = localStorage.getItem('admins');
        this.admins = adminsString ? JSON.parse(adminsString) : [];

        const employeesString = localStorage.getItem('employees');
        this.employees = employeesString ? JSON.parse(employeesString) : [];

        const clientsString = localStorage.getItem('clients');
        this.clients = clientsString ? JSON.parse(clientsString) : [];

        this.token = localStorage.getItem('token') || '';
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

    goToAdministrator(): void {
        localStorage.setItem('origin', origin);
        if (this.admins.length > 0 && this.admins[0].organizationId) {
            this.router.navigate(['/administrator']);
            this.router.navigate(['/select-organization']);
        } else {
            this.errorMessage = "Administrator not found.";
        }  
    } 
}
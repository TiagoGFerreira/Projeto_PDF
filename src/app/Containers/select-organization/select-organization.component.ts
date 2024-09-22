import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, ActivatedRoute } from '@angular/router';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { OrganizationService } from '../../Services/OrganizationService';
import { AlertComponent } from "../../components/Alert/alert/alert.component";
import { CommonModule } from '@angular/common';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-select-organization',
    standalone: true,
    imports: [PrimaryButtonComponent, SecondaryButtonComponent, CommonModule, NgForOf, AlertComponent],
    templateUrl: './select-organization.component.html',
    styleUrls: ['./select-organization.component.css']
})
export class SelectOrganizationComponent implements OnInit {
    organizationData: any[] = [];
    errorMessage: string = "";
    origin: string = '';
    employees: any[] = [];
    clients: any[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private organizationService: OrganizationService) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.origin = params['origin'] || '';

            const employeesString = localStorage.getItem('employees');
            this.employees = employeesString ? JSON.parse(employeesString) : [];

            const clientsString = localStorage.getItem('clients');
            this.clients = clientsString ? JSON.parse(clientsString) : [];

        });

        this.loadOrganizations(this.origin);

    }

    loadOrganizations(origin: string) {
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
                    this.errorMessage = "Unknown error: " + error.message;
                }
            }
        );
    }

    GoToSearch() {
        this.router.navigate(['/search-organizations']);
    }

    GoToOrganization(origin: string, id: number) {
        localStorage.setItem('CurrentOrganizationId', id.toString());
        var to;
        switch (origin) {
            case 'client':
            case 'employee':
                to = '/calendar';
                break;
            case 'admin':
                to = '/administrator';
                break
        }
        this.router.navigate([to], { queryParams: { origin: origin } });
    }

    onCloseAlert() {
        this.errorMessage = "";
    }
}
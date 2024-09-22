import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { ServiceService } from '../../Services/ServiceService';
import { AddService, UpdateService } from '../../Models/Service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-add-edit-service',
    standalone: true,
    templateUrl: './add-edit-service.component.html',
    styleUrl: './add-edit-service.component.css',
    imports: [TextInputComponent, PrimaryButtonComponent, DropdownComponent, FormsModule]
})
export class AddEditServiceComponent implements OnInit {

    categories: any[] = [];

    errorMessage: string = "";
    successMessage: string = "";

    action = localStorage.getItem('Action')

    serviceData: any = {}

    addService: AddService = {
        name: '',
        duration: 5,
        categoryId: 0,
        organizationId: parseInt(localStorage.getItem('CurrentOrganizationId') || '0')
    }

    editService: UpdateService = {
        name: null,
        duration: null,
        categoryId: null
    }

    serviceId = parseInt(localStorage.getItem('CurrentServiceId') || '0');
    origin = 'admin';
    constructor(private router: Router, private serviceService: ServiceService) { }

    ngOnInit(): void {
        this.serviceService.GetSingleService(this.serviceId, this.origin).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error("Error when getting service:", error);
                this.errorMessage = `Error: ${error.statusText} (${error.status})`;
                return of(null);
            })
        ).subscribe((service) => {
            if (service) {
                this.serviceData = service;
            }
        });
    }

    onSelectionChange(selectedCategoryId: number) {
        this.addService.categoryId = selectedCategoryId;
    }

    AddService() {
        this.serviceService.AddService(this.addService).subscribe(
            (response) => {
                if (response.code === 200) {
                    this.successMessage = "The Service was created with success";
                    this.router.navigate(['/admin-services']);
                }
            },
            (error) => {
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

    onSelectionChangeCategory(selectedCategoryId: number) {
        this.editService.categoryId = selectedCategoryId;
    }

    EditService(serviceId: number) { //TODO não le o valor do id da categoria que vem da base de dados

        let updateParams: any = {};

        if (this.editService.name !== null || "") {
            updateParams.name = this.editService.name;
        }

        if (this.editService.duration !== null || "") {
            updateParams.duration = this.editService.duration;
        }

        if (this.editService.categoryId !== null || "") {
            updateParams.categoryId = this.editService.categoryId;
        }

        if (Object.keys(updateParams).length === 0) {
            this.errorMessage = "No fields have been modified.";
            return;
        }

        this.serviceService.UpdateService(serviceId, this.editService).subscribe((response) => {
            if (response.code === 200) {
                this.successMessage = "The Service was updated with success";
                this.router.navigate(['/admin-services']);
            }
        },
            (error) => {
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
}

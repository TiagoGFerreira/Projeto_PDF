import { Component } from "@angular/core";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { OrganizationService } from "../../Services/OrganizationService";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "../../components/Alert/alert/alert.component";
import { HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { EditOrganization } from '../../Models/Organization'
import { AddOrganization } from '../../Models/Organization'
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";


@Component({
    selector: 'app-update-organization',
    standalone: true,
    providers: [],
    templateUrl: './update-organization.component.html',
    styleUrl: './update-organization.component.css',
    imports: [
        PrimaryButtonComponent,
        TextInputComponent,
        AlertComponent,
        FormsModule,
        CommonModule,
        DropdownComponent
    ]
})
export class UpdateOrganizationComponent {
  updateData: EditOrganization = {
    name: null,
    logoUrl: null,
    countryId: null,
    street: null,
    doorNumber: null,
    postalCode: null,
    phoneNumber: null,
    email: null,
    adminEmail: null
  };

  organizationData: any = {};
  errorMessage: string = "";
  countries: any[] = [];
  organizationId: number = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');
  origin: string = "";

  constructor(private router: Router, private route: ActivatedRoute, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.origin = localStorage.getItem('origin') ?? 'default';
    this.organizationService.GetSingleOrganization(this.organizationId).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Error when getting organization:", error);
        this.errorMessage = `Error: ${error.statusText} (${error.status})`;
        return of(null);
      })
    ).subscribe((organization) => {
      if (organization) {
        this.organizationData = organization;
      }
    });
  };


  onSelectionChange(selectedCountryId: number) {
    this.updateData.countryId = selectedCountryId;
  }

  onCloseAlert() {
    this.errorMessage = "";
  }

  UpdateOrganization() {
    let updateParams: any = {};

    if (this.updateData.name !== null || "") {
      updateParams.name = this.updateData.name;
    }
    if (this.updateData.logoUrl !== null || "") {
      updateParams.logoUrl = this.updateData.logoUrl;
    }
    if (this.updateData.countryId !== null || "") {
      updateParams.countryId = this.updateData.countryId;
    }
    if (this.updateData.street !== null || "") {
      updateParams.street = this.updateData.street;
    }
    if (this.updateData.doorNumber !== null || "") {
      updateParams.doorNumber = this.updateData.doorNumber;
    }
    if (this.updateData.postalCode !== null || "") {
      updateParams.postalCode = this.updateData.postalCode;
    }
    if (this.updateData.phoneNumber !== null || "") {
      updateParams.phoneNumber = this.updateData.phoneNumber;
    }
    if (this.updateData.email !== null || "") {
      updateParams.email = this.updateData.email;
    }
    if (this.updateData.adminEmail !== null || "") {
      updateParams.adminEmail = this.updateData.adminEmail;
    }

    console.log("Update Parameters:", updateParams);


    if (Object.keys(updateParams).length === 0) {
      this.errorMessage = "No fields have been modified.";
      return;
    }


    this.organizationService.UpdateOrganization(this.organizationId, updateParams).subscribe(
      (response) => {
        if (response.code === 200) {
          this.GoTo(this.origin);
        }
      },
      (error: HttpErrorResponse) => {
        console.error("Erro ao chamar o backend:", error);
        if (error.status === 400) {
          this.errorMessage = "Erro de validação: " + error.error.message;
        } else if (error.status === 500) {
          this.errorMessage = "Erro interno do servidor.";
        } else {
          this.errorMessage = "Erro desconhecido: " + error.message;
        }
      }
    );
  }

  GoTo(origin:string) {
    if(origin === 'master')
      {
        this.router.navigate(['/organizations-management']);
      }
    else{
      this.router.navigate(['/administrator']);
    }
  }
}

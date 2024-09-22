import { Component } from "@angular/core";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { OrganizationService } from "../../Services/OrganizationService";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AlertComponent } from "../../components/Alert/alert/alert.component";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterModule } from '@angular/router';
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { AddOrganization } from "../../Models/Organization";

@Component({
  selector: "app-add-organization",
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    TextInputComponent,
    AlertComponent,
    FormsModule,
    CommonModule,
    DropdownComponent
  ],
  templateUrl: "./add-organization.component.html",
  styleUrl: "./add-organization.component.css",
})
export class AddOrganizationComponent {
  organizationData: any = {};
  errorMessage: string = "";
  countries: any[] = [];

  organization: AddOrganization = {
    name: "",
    logoUrl: "",
    countryId: 0,
    street: "",
    doorNumber: 0,
    postalCode: 0,
    phoneNumber: 0,
    email: "",
    adminEmail: ""
  };

  constructor(private router: Router ,private organizationService: OrganizationService) {}

  onCloseAlert() {
    this.errorMessage = "";
  }
  
  onSelectionChange(selectedCountryId: number) {
    this.organization.countryId = selectedCountryId;
  }

  AddOrganization() {
    if (Object.values(this.organization).some((value) => !value)) {
      this.errorMessage = "Please fill in all fields.";
      return;
    }

    if (!this.validateFieldsFormat()) {
      this.errorMessage = "Please check the format of the fields.";
      return;
    }


    console.log(this.organization);
    this.organizationService.AddOrganization(this.organization).subscribe(
      (response) => {
        if (response.code === 200) {
          this.GoTo();
        }
      },
      (error: HttpErrorResponse) => {
        console.error("Error when calling the backend:", error);

        if (error.status === 400) {
          this.errorMessage = "Validation error: " + error.error.message;
        } else if (error.status === 500) {
          this.errorMessage = "Internal server error.";
        } else {
          this.errorMessage = "Erro desconhecido: " + error.message;
        }
      }
    );
  }

  private validateFieldsFormat(): boolean {
    if (!/^\d+$/.test(this.organization.phoneNumber.toString())) {
      return false;
    }

    if (!/^\d+$/.test(this.organization.postalCode.toString())) {
      return false;
    }

    return true;
  }

  GoTo(){
    this.router.navigate(['/organizations-management']);
  }
}

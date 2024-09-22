import { Component } from '@angular/core';
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { AuthService } from '../../Services/AuthService';
import { SignUp } from '../../Models/Auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  imports: [TextInputComponent, PrimaryButtonComponent, DropdownComponent, FormsModule, RouterModule]
})
export class SignUpComponent {

  user: SignUp = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    countryId: 0,
    street: '',
    doorNumber: 0,
    postalCode: 0
  }

  countries: any[] = [];

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSelectionChange(selectedCountryId: number) {
    this.user.countryId = selectedCountryId;
  }

  SignUp() {
    this.authService.SignUp(this.user).subscribe(
      (response) => {
        if (response.code === 200) {
          console.log('Success');
          this.router.navigate(['/sign-in']);
        } else {
          console.error('Error . Code:', response.code);
          this.errorMessage = 'An error occurred while trying to register the user.';
        }
      },
      (error) => {
        console.error('Error', error);
        this.errorMessage = 'An error occurred while trying to register the user.';
      });
  }

}

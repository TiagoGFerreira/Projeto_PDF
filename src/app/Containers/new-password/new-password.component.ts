import { Component } from '@angular/core';
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/AuthService';
import { RecoverPassword } from '../../Models/Auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-password',
    standalone: true,
    templateUrl: './new-password.component.html',
    styleUrl: './new-password.component.css',
    imports: [TextInputComponent, PrimaryButtonComponent,FormsModule]
})
export class NewPasswordComponent {

    recoverData: RecoverPassword = {
        email: '',
        mfa: '',
        newPassword: ''
    }
    errorMessage: string = '';

    constructor(private authService: AuthService, private router: Router){
    }
    
    NewPassword() {
        this.authService.RecoverPassword(this.recoverData).subscribe(
            (response) => {
                if (response.code === 200) {
                    this.router.navigate(['/sign-in']);
                } else {
                    this.errorMessage = `Error resetting password: ${response.code}`;
                    console.log('Error resetting password:', this.errorMessage);
                }
            },
            (error) => {
                console.error('Error resetting password:', error);
                this.errorMessage = 'Error resetting password, try again later.';
            }
        );
    }
}

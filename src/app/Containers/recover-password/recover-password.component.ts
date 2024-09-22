import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { MfaService } from '../../Services/MfaService';
import { Mfa } from '../../Models/Mfa';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recover-password',
    standalone: true,
    templateUrl: './recover-password.component.html',
    styleUrl: './recover-password.component.css',
    imports: [PrimaryButtonComponent, TextInputComponent,FormsModule]
})
export class RecoverPasswordComponent {

    mfaData: Mfa={
        email:''
    }

    errorMessage: string = '';

    constructor(private mfaService: MfaService,private router: Router){
    }

    SendEmail() {
        this.mfaService.GenerateMfa(this.mfaData).subscribe(
            (response) => {
                if (response.code === 200) {
                    this.router.navigate(['/new-password']);
                } else {
                    this.errorMessage = `Error sending email: ${response.code}`;
                    console.log('Error sending email:', this.errorMessage);
                }
            },
            (error) => {
                console.error('Error sending email:', error);
                this.errorMessage = 'Error sending email, try again later';
            }
        );
    }
}

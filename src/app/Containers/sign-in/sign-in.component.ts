import { Component , Inject, OnInit } from '@angular/core';
import { AuthService } from '../../Services/AuthService';
import { Me, SignIn } from '../../Models/Auth';
import { FormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css',
    imports: [FormsModule, PrimaryButtonComponent, TextInputComponent,RouterModule]
})
export class SignInComponent implements OnInit{

  user: SignIn = {
    email: '',
    password: ''
  }
  
  errorMessage: string = '';

  

  constructor(private authService : AuthService, private router: Router){}

  LogOut(){
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
  }

  ngOnInit() {
    this.LogOut();
  }

  SignIn() {
    this.authService.SignIn(this.user).subscribe(
        (response) => {
            if (response.code === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                this.GetMe();
                this.router.navigate(['/sign-in-as']);
                console.log(this.user);
            } else {
                this.errorMessage = `Erro no login: ${response.code}`;
                console.log('Login error:', this.errorMessage);
            }
        },
        (error) => {
            console.error('Erro ao fazer login:', error);
            this.errorMessage = 'Erro ao fazer login. Por favor, tente novamente mais tarde.';
        }
    );
  }

  GetMe() {
    this.authService.GetMe().subscribe(
        (response) => {
            if (response.code === 200) {
                const user: Me = response.data;
                    localStorage.setItem('isMaster', user.roles.isMaster.toString());
                    localStorage.setItem('admins', JSON.stringify(user.roles.admin));
                    localStorage.setItem('employees', JSON.stringify(user.roles.employee));
                    localStorage.setItem('clients', JSON.stringify(user.roles.client));
            } else {
                console.error('Erro ao obter dados do usuário:', response.message);
            }
        },
        (error) => {
            console.error('Erro ao obter dados do usuário:', error);
        }
    );
}
}

import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-administrator',
    standalone: true,
    templateUrl: './administrator.component.html',
    styleUrl: './administrator.component.css',
    imports: [PrimaryButtonComponent,RouterModule]
})
export class AdministratorComponent {
    
    constructor(private router: Router){}

    GoToOrganization(){
        this.router.navigate(['/update-organization']); // Para editar a organização ou apagar 
    }

    GoToServices(){
        this.router.navigate(['/admin-services']);
    }

    GoToEmployees(){
        this.router.navigate(['/admin-employees']);
    }

    GoToClientRequest(){
        this.router.navigate(['/client-requests']);
    }
}

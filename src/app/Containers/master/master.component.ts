import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-master',
    standalone: true,
    templateUrl: './master.component.html',
    styleUrl: './master.component.css',
    imports: [PrimaryButtonComponent,RouterModule]
})
export class MasterComponent {

    constructor(private router: Router){}

    ngOnInit(): void {
    }

    GoToOrganizations(){
        this.router.navigate(['/organizations-management']);
    }

    GoToCategories(){
        this.router.navigate(['/categories-management']);
    }
}

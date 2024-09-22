import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { FormsModule } from '@angular/forms';
import { AddCategory } from '../../Models/Category';
import { CategoryService } from '../../Services/CategoryService';
import { AlertComponent } from "../../components/Alert/alert/alert.component";
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-add-category',
    standalone: true,
    templateUrl: './add-category.component.html',
    styleUrl: './add-category.component.css',
    imports: [PrimaryButtonComponent, TextInputComponent, FormsModule, AlertComponent, RouterModule]
})
export class AddCategoryComponent {
    errorMessage: string = "";
    successMessage: string = "";

    category: AddCategory = {
        name: ''
    };

    constructor(private router: Router, private categoriesService: CategoryService) { }

    addCategory() {
        this.categoriesService.AddCategory(this.category).subscribe(
          (response) => {
            if (response.code === 200) {
              this.successMessage = "The category was created with success";
              this.GoTo();
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

    GoTo(){
        this.router.navigate(['/categories-management']);
    }
}

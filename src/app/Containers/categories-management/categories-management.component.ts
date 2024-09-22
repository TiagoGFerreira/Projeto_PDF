import { Component, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, RouterModule } from '@angular/router';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { CategoryService } from "../../Services/CategoryService"
import { AlertComponent } from "../../components/Alert/alert/alert.component";

@Component({
    selector: 'app-categories-management',
    standalone: true,
    templateUrl: './categories-management.component.html',
    styleUrl: './categories-management.component.css',
    imports: [PrimaryButtonComponent, RouterModule, SecondaryButtonComponent,AlertComponent]
})
export class CategoriesManagementComponent implements OnInit {
    categoriesData: any[] = [];
    errorMessage: string = "";
    successMessage: string = "";

    constructor(private router: Router , private categoriesService: CategoryService ){}
    ngOnInit(){
        this.loadCategories();
    }

    onCloseAlert() {
      this.errorMessage = "";
    }
    onCloseAlert2() {
      this.successMessage = "";
    }

    loadCategories() {
        this.categoriesService.GetAllCategories().subscribe(
          (response) => {
            if (response.code === 200) {
              this.categoriesData = response.data;
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
              this.errorMessage = "Unknow error: " + error.message;
            }
          }
        );
      }

      deleteCategory(categoryId: number) {
        this.categoriesService.DeleteCategory(categoryId).subscribe(
          (response) => {
            if (response.code === 200) {
              this.successMessage = "The category was deleted with success";
              this.loadCategories();
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
        this.router.navigate(['/add-category']);
    }
}

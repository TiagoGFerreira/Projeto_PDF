

// import { Component, EventEmitter, Inject, Input, OnInit, Output, Optional } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BaseDataService } from '../../../Services/BaseDataService';
// import { Country, DaysOfWeek } from '../../../Models/BaseData';
// import { GetCategory } from '../../../Models/Category';
// import { catchError, of } from 'rxjs';
// import { CategoryService } from '../../../Services/CategoryService';
// import { FormsModule } from '@angular/forms';
// import { ServiceService } from '../../../Services/ServiceService';
// import { GetService } from '../../../Models/Service';
// import { AddOrganizationComponent } from '../../../Containers/add-organization/add-organization.component';

// const defaultCountries: Country[] = [
//   { id: 1, name: 'Portugal', code: 'C1', phoneIndicative: 1 },
//   { id: 2, name: 'Espanha', code: 'C2', phoneIndicative: 2 },
//   { id: 3, name: 'França', code: 'C3', phoneIndicative: 3 },
// ];

// const defaultCategories: GetCategory[] = [
//   { id: 1, name: 'Barbeiro' },
//   { id: 2, name: 'Cabeleireiro' }
// ];

// const defaultDaysOfWeek: DaysOfWeek[] = [
//   { id: 1, name: 'Domingo' },
//   { id: 2, name: 'Segunda' },
//   { id: 3, name: 'Terça' },
//   { id: 4, name: 'Quarta' },
//   { id: 5, name: 'Quinta' },
//   { id: 6, name: 'Sexta' },
//   { id: 7, name: 'Sabado' },
// ];

// @Component({
//   selector: 'app-dropdown',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule
//   ],
//   templateUrl: './dropdown.component.html',
//   styleUrls: ['./dropdown.component.css']
// })
// export class DropdownComponent implements OnInit {
//   @Input() information: string = '';
//   @Input() options: { id: number, name: string }[] | undefined;

//   @Input() valueProperty: string = 'id';
//   @Input() displayProperty: string = 'name';
//   @Output() selectionChange = new EventEmitter<number>();

//   selectedOptionId: number = 0;

//   private dataService: BaseDataService | CategoryService | ServiceService | null = null;

//   constructor(
//     @Optional() @Inject(BaseDataService) private baseDataService: BaseDataService,
//     @Optional() @Inject(CategoryService) private categoryService: CategoryService,
//     @Optional() @Inject(BaseDataService) private dayService: BaseDataService,
//     @Optional() @Inject(ServiceService) private serviceService: ServiceService
//   ) {
//     switch (this.information) {
//       case 'Country':
//         this.dataService = this.baseDataService;
//         break;
//       case 'Category':
//         this.dataService = this.categoryService;
//         break;
//       case 'Day':
//         this.dataService = this.dayService;
//         break;
//       case 'Service':
//         this.dataService = this.serviceService;
//         break;
//     }
//   }
  
//   ngOnInit() {
//     this.currentOrganization = parseInt(localStorage.getItem('CurrentOrganizationId') || '0');
//     this.fetchData();
//   }

//   fetchData() {
//     switch (this.information) {
//       case 'Country':
//         this.baseDataService.GetAllCountries().pipe(
//           catchError(error => {
//             console.error('Error fetching countries:', error);
//             this.options = defaultCountries.map(country => ({ id: country.id, name: country.name }));
//             return of({ data: defaultCountries });
//           })
//         ).subscribe(response => {
//           if (response && response.data && Array.isArray(response.data)) {
//             this.options = response.data.map((country: Country) => ({ id: country.id, name: country.name }));
//           } else {
//             this.options = defaultCountries.map(country => ({ id: country.id, name: country.name }));
//           }
//         });
//         break;
//       case 'Day':
//         this.baseDataService.GetAllDays().pipe(
//           catchError(error => {
//             console.error('Error fetching days of the week:', error);
//             this.options = defaultDaysOfWeek.map(day => ({ id: day.id, name: day.name }));
//             return of({ data: defaultDaysOfWeek });
//           })
//         ).subscribe(response => {
//           if (response && response.data && Array.isArray(response.data)) {
//             this.options = response.data.map((day: DaysOfWeek) => ({ id: day.id, name: day.name }));
//           } else {
//             this.options = defaultDaysOfWeek.map(day => ({ id: day.id, name: day.name }));
//           }
//         });
//         break;
//         case 'Service':
//         this.serviceService.GetAllServices('amdin',currentOrganization).subscribe(response => {
//           if (response && response.data && Array.isArray(response.data)) {
//             this.options = response.data.map((service: GetService) => ({ id: service.id, name: service.name }));
//           } else {
//             this.options = defaultDaysOfWeek.map(day => ({ id: day.id, name: day.name }));
//           }
//         });
//         break;
//       case 'Category':
//         this.categoryService.GetAllCategories().pipe(
//           catchError(error => {
//             console.error('Error fetching categories:', error);
//             this.options = defaultCategories.map(category => ({ id: category.id, name: category.name }));
//             return of({ data: defaultCategories });
//           })
//         ).subscribe(response => {
//           if (response && response.data && Array.isArray(response.data)) {
//             this.options = response.data.map((category: GetCategory) => ({ id: category.id, name: category.name }));
//           } else {
//             this.options = defaultCategories.map(category => ({ id: category.id, name: category.name }));
//           }
//         });
//         break;
//       default:
//         console.error('Invalid information type:', this.information);
//         this.options = defaultCountries.map(country => ({ id: country.id, name: country.name }));
//         break;
//     }
//   }

//   getOptionValue(option: any): any {
//     return option && option[this.valueProperty];
//   }

//   getOptionDisplay(option: any): string {
//     return option && option[this.displayProperty];
//   }

//   onOptionSelect(event: any) {
//     const selectedId = event.target.value;
//     this.selectionChange.emit(selectedId);
//   }
// }

import { Component, EventEmitter, Inject, Input, OnInit, Output, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDataService } from '../../../Services/BaseDataService';
import { Country, DaysOfWeek } from '../../../Models/BaseData';
import { GetCategory } from '../../../Models/Category';
import { catchError, of } from 'rxjs';
import { CategoryService } from '../../../Services/CategoryService';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../Services/ServiceService';
import { GetService } from '../../../Models/Service';

const defaultCountries: Country[] = [
  { id: 1, name: 'Portugal', code: 'C1', phoneIndicative: 1 },
  { id: 2, name: 'Espanha', code: 'C2', phoneIndicative: 2 },
  { id: 3, name: 'França', code: 'C3', phoneIndicative: 3 },
];

const defaultCategories: GetCategory[] = [
  { id: 1, name: 'Barbeiro' },
  { id: 2, name: 'Cabeleireiro' }
];

const defaultDaysOfWeek: DaysOfWeek[] = [
  { id: 1, name: 'Domingo' },
  { id: 2, name: 'Segunda' },
  { id: 3, name: 'Terça' },
  { id: 4, name: 'Quarta' },
  { id: 5, name: 'Quinta' },
  { id: 6, name: 'Sexta' },
  { id: 7, name: 'Sabado' },
];

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() information: string = '';
  @Input() options: { id: number, name: string }[] | undefined;

  @Input() valueProperty: string = 'id';
  @Input() displayProperty: string = 'name';
  @Output() selectionChange = new EventEmitter<number>();

  selectedOptionId: number = 0;

  private dataService: BaseDataService | CategoryService | ServiceService | null = null;
  private currentOrganization: number = 0;

  constructor(
    @Optional() @Inject(BaseDataService) private baseDataService: BaseDataService,
    @Optional() @Inject(CategoryService) private categoryService: CategoryService,
    @Optional() @Inject(BaseDataService) private dayService: BaseDataService,
    @Optional() @Inject(ServiceService) private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.currentOrganization = parseInt(localStorage.getItem('CurrentOrganizationId') || '0', 10);
    this.initializeDataService();
    this.fetchData();
  }

  private initializeDataService() {
    switch (this.information) {
      case 'Country':
        this.dataService = this.baseDataService;
        break;
      case 'Category':
        this.dataService = this.categoryService;
        break;
      case 'Day':
        this.dataService = this.dayService;
        break;
      case 'Service':
        this.dataService = this.serviceService;
        break;
      default:
        console.error('Invalid information type:', this.information);
    }
  }

  private fetchData() {
    if (!this.dataService) {
      console.error('Data service not initialized');
      return;
    }

    switch (this.information) {
      case 'Country':
        this.fetchCountries();
        break;
      case 'Day':
        this.fetchDaysOfWeek();
        break;
      case 'Service':
        this.fetchServices();
        break;
      case 'Category':
        this.fetchCategories();
        break;
      default:
        console.error('Invalid information type:', this.information);
    }
  }

  private fetchCountries() {
    this.baseDataService?.GetAllCountries().pipe(
      catchError(error => {
        console.error('Error fetching countries:', error);
        this.options = defaultCountries.map(country => ({ id: country.id, name: country.name }));
        return of({ data: defaultCountries });
      })
    ).subscribe(response => {
      this.options = response.data.map((country: Country) => ({ id: country.id, name: country.name }));
    });
  }

  private fetchDaysOfWeek() {
    this.baseDataService?.GetAllDays().pipe(
      catchError(error => {
        console.error('Error fetching days of the week:', error);
        this.options = defaultDaysOfWeek.map(day => ({ id: day.id, name: day.name }));
        return of({ data: defaultDaysOfWeek });
      })
    ).subscribe(response => {
      this.options = response.data.map((day: DaysOfWeek) => ({ id: day.id, name: day.name }));
    });
  }

  private fetchServices() {
    this.serviceService?.GetAllServices('admin', this.currentOrganization).pipe(
      catchError(error => {
        console.error('Error fetching services:', error);
        this.options = [];
        return of({ data: [] as GetService[] });
      })
    ).subscribe(response => {
      this.options = response.data.map((service: GetService) => ({ id: service.id, name: service.name }));
    });
  }

  private fetchCategories() {
    this.categoryService?.GetAllCategories().pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        this.options = defaultCategories.map(category => ({ id: category.id, name: category.name }));
        return of({ data: defaultCategories });
      })
    ).subscribe(response => {
      this.options = response.data.map((category: GetCategory) => ({ id: category.id, name: category.name }));
    });
  }

  getOptionValue(option: any): any {
    return option && option[this.valueProperty];
  }

  getOptionDisplay(option: any): string {
    return option && option[this.displayProperty];
  }

  onOptionSelect(event: any) {
    const selectedId = event.target.value;
    this.selectionChange.emit(Number(selectedId));
  }
}

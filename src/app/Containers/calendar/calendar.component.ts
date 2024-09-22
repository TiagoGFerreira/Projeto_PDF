import { Component, OnInit } from '@angular/core';
import { DateInputComponent } from "../../components/Input/date-input/date-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
    selector: 'app-calendar',
    standalone: true,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
    imports: [DateInputComponent, PrimaryButtonComponent, FormsModule]
})
export class CalendarComponent implements OnInit {
    selectedDate: string = new Date().toISOString().split('T')[0]; 
    origin: string = "";

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.origin = params['origin'] || '';
        });
    }

    onDateSelected(newDate: string) {
        this.selectedDate = newDate;
    }

    GoTo() {
        const selectedDateAsDate = new Date(this.selectedDate);
        this.router.navigate(['/day-services'], { queryParams: { date: selectedDateAsDate.toISOString(), origin: this.origin } });
    }
}

import { Component } from '@angular/core';
import { SecondaryButtonComponent } from "../../components/Button/secondary-button/secondary-button.component";
import { TextInputComponent } from "../../components/Input/text-input/text-input.component";
import { PrimaryButtonComponent } from "../../components/Button/primary-button/primary-button.component";
import { FormsModule } from '@angular/forms';
import { AddWorktime } from '../../Models/Worktime';
import { WorktimeService } from '../../Services/WorktimeService';
import { Router } from '@angular/router';
import { DaysOfWeek } from '../../Models/BaseData';
import { DropdownComponent } from "../../components/DropDown/dropdown/dropdown.component";
import { TimeInputComponent } from "../../components/Input/time-input/time-input.component";
import { Console } from 'console';

@Component({
    selector: 'app-worktime-employee',
    standalone: true,
    templateUrl: './worktime-employee.component.html',
    styleUrl: './worktime-employee.component.css',
    imports: [SecondaryButtonComponent, TextInputComponent, PrimaryButtonComponent, FormsModule, DropdownComponent, TimeInputComponent]
})
export class WorktimeEmployeeComponent {

    worktime: AddWorktime = {
        dayOfWeekId: 0,
        startTime: 0,
        endTime: 0,
        employeeId: parseInt(localStorage.getItem('CurrentEmployeeId') || '0')
    }

    startTime: string = '';
    endTime: string = '';

    daysOfWeek: DaysOfWeek[] = [];
    errorMessage: string = '';

    constructor(private WorktimesService: WorktimeService,private router: Router){}

    onCloseAlert() {
        this.errorMessage = "";
    }

    onSelectionChangeDayOfWeek(selectedDayOfWeekId: number) {
        this.worktime.dayOfWeekId = selectedDayOfWeekId;
    }

    convertTimeToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    Converter(){
        const startTimeSeconds = this.convertTimeToMinutes(this.startTime);
        const endTimeSeconds = this.convertTimeToMinutes(this.endTime);
        this.worktime.startTime = startTimeSeconds;
        this.worktime.endTime = endTimeSeconds;
        console.log(this.worktime.startTime);
        console.log(this.worktime.endTime);
    }

    AddWorktime(){
        this.Converter();
        this.WorktimesService.AddWorktime(this.worktime).subscribe(
            (response) => {
                if (response.code === 200) {
                    this.router.navigate(['/edit-employee']);
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

}

import { Injectable } from "@angular/core";
import { HttpClient , HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Appointment , FreeTimeslots} from "../Models/Appointment";
import { EditAppointment } from "../Models/Appointment"
import { Observable } from "rxjs";
import { ServiceResponse } from "../Models/ServiceResponse";


@Injectable({
    providedIn: 'root'
})
export class AppointmentService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAppointments(startDate: number, endDate: number,origin: string): Observable<ServiceResponse>
    {
        const url = this.apiUrl + '/api/Appointment';
        var params = new HttpParams()
        .set('startDate', startDate)
        .set('endDate',endDate)
        .set('origin',origin);
        return this.httpClient.get<ServiceResponse>(url, {params});
    }

    AddAppointment(appointmentData: Appointment): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Appointment`, appointmentData);
    }

    DeleteAppointment(id: number, origin: string): Observable<ServiceResponse> {
        const url = `${this.apiUrl}/api/Appointment/${id}`;
        const params = new HttpParams()
        .set('origin', origin)
        return this.httpClient.delete<ServiceResponse>(url, { params });
    }

    EditAppointment(id: number, EditAppointment: EditAppointment): Observable<ServiceResponse> {
        const url = `${this.apiUrl}/api/Appointment/${id}`;
        const body = { dateTime: EditAppointment.dateTime };
        return this.httpClient.put<any>(url, body);
    }
    
    GetFreeTimeslots(organizationId: number, startTime:number, endTime:number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Appointment/GetFreeTimeslots`;
        var params = new HttpParams()
        .set('organizationId',organizationId)
        .set('startTime',startTime)
        .set('endTime',endTime);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }
}
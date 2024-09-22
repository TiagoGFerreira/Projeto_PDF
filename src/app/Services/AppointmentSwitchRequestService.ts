import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AcceptAppointmentSwitchRequest, AppointmentSwitchRequest } from "../Models/AppointmentSwitchRequest";
import { Observable } from "rxjs";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class AppointmentSwitchRequestService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    AddAppointmentSwitchRequest(appointmentData: AppointmentSwitchRequest): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/AppointmentSwitchRequest`, appointmentData);
    }

    AcceptAppointmentSwitchRequest(id: number, acceptappointmentData: AcceptAppointmentSwitchRequest): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/AppointmentSwitchRequest/${id}`;
        let params = new HttpParams();
        params = params.set('accept', acceptappointmentData.accept.toString());
        return this.httpClient.put<any>(url, {}, { params });
    }

}
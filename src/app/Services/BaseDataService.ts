import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Country, DaysOfWeek, NotificationType, PostalCode } from "../Models/BaseData";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class BaseDataService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAllDays(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/BaseData/DaysOfWeek`);
    }

    GetAllCountries(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/BaseData/Countries`);
    }

    GetAllPostalCodes(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/BaseData/PostalCodes`);
    }

    GetAllNotificationsTypes(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/BaseData/NotificationsTypes`);
    }
    
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddService, GetService, UpdateService } from "../Models/Service";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class ServiceService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAllServices(origin: string, organizationId:number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Service`;
        var params = new HttpParams()
        .set('origin',origin)
        .set('organizationId',organizationId);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }

    GetSingleService(id: number, origin: string): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Service/${id}`;
        var params = new HttpParams()
        .set('origin',origin);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }

    AddService(serviceData: AddService): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Service`,serviceData)
    }

    DeleteService(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Service/${id}`;
        return this.httpClient.delete<ServiceResponse>(url);
    }

    UpdateService(id:number, serviceData: UpdateService): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Service/${id}`;
        return this.httpClient.put<ServiceResponse>(url,serviceData);
    }
}
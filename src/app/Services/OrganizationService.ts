import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddOrganization } from "../Models/Organization";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class OrganizationService{
    GetOrganizationsByAdmin(adminId: string) {
      throw new Error('Method not implemented.');
    }

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAllOrganizations(origin: string): Observable<ServiceResponse> 
    {
        var params = new HttpParams()
        .set('origin',origin)
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/Organization`,{params});
    }

    GetSingleOrganization(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Organization/${id}`;
        return this.httpClient.get<ServiceResponse>(url);
    }
    
    AddOrganization(organizationData: AddOrganization): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Organization`,organizationData);
    }

    DeleteOrganization(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Organization/${id}`
        return this.httpClient.delete<ServiceResponse>(url);
    }

    UpdateOrganization(id: number, organizationData:AddOrganization): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Organization/${id}`;
        return this.httpClient.put<ServiceResponse>(url,organizationData);
    }
}
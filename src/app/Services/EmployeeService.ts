import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { GetEmployee , AddEmployee } from "../Models/Employee";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAllEmployees(origin: string, organizationId: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Employee`;
        var params = new HttpParams()
        .set('origin',origin)
        .set('organizationId',organizationId)
        return this.httpClient.get<ServiceResponse>(url,{params});
    }

    AddEmployee(employeeData: AddEmployee): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Employee`,employeeData);
    }

    GetSingleEmployee(id: number,origin: string): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Employee/${id}`;
        var params = new HttpParams()
        .set('origin',origin);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }

    DeleteEmployee(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Employee/${id}`;
        return this.httpClient.delete<ServiceResponse>(url);
    }
}
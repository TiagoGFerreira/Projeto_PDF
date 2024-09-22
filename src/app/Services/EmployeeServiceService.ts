import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddEmployeeService } from "../Models/EmployeeService";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    AddEmployeeService(employeeServiceData: AddEmployeeService): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/EmployeeService`,employeeServiceData);
    }

    DeleteEmployeeService(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/EmployeeService/${id}`;
        return this.httpClient.delete<ServiceResponse>(url);
    }

    GetAllEmployeeServices(employeeId: number): Observable<ServiceResponse>{
        const url = `${this.apiUrl}/api/EmployeeService`;
        var params = new HttpParams()
        .set('employeeId',employeeId);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }
}
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddWorktime, GetWorktime } from "../Models/Worktime";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class WorktimeService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetWorktimes(employeeId: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Worktime`;
        var params = new HttpParams()
        .set('employeeId',employeeId);
        return this.httpClient.get<ServiceResponse>(url,{params});
    }

    AddWorktime(WorktimeData: AddWorktime): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Worktime`,WorktimeData);
    }  

    DeleteWorktime(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Worktime/${id}`;
        return this.httpClient.delete<ServiceResponse>(url);
    }
    
}
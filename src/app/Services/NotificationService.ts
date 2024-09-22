import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { GetNotification } from "../Models/Notification";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class NotificationService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetNotifications(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/Notification`);
    }

    MarkAsRead(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Notification/${id}`;
        return this.httpClient.put<ServiceResponse>(url,null);
    }
}
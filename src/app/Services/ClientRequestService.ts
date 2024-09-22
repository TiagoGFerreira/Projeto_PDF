    import { Injectable } from "@angular/core";
    import { HttpClient, HttpParams } from "@angular/common/http";
    import { environment } from "../../environments/environment";
    import { Observable } from "rxjs";
    import { AcceptClientRequest, AddClientRequest, GetClientRequest } from "../Models/ClientRequest";
    import { ServiceResponse } from "../Models/ServiceResponse";

    @Injectable({
        providedIn: 'root'
    })
    export class ClientRequestService{

        private apiUrl = environment.api

        constructor(private httpClient : HttpClient){
        }

        GetAllRequests(): Observable<ServiceResponse>
        {
            return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/ClientRequest`);
        }

        AddRequest(requestData: AddClientRequest): Observable<ServiceResponse>
        {
            return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/ClientRequest`,requestData);
        }

        AcceptRequest(id: number, requestData: AcceptClientRequest): Observable<ServiceResponse> {
            const url = `${this.apiUrl}/api/ClientRequest/${id}`;
            let params = new HttpParams();
            params = params.set('accept', requestData.accepted.toString());
            return this.httpClient.put<any>(url, {}, { params });
        }
        
    }




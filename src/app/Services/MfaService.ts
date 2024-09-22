import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Mfa } from "../Models/Mfa";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class MfaService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GenerateMfa(mfaData: Mfa): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Mfa`,mfaData);
    }

}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { SignIn , SignUp, RecoverPassword, Me } from "../Models/Auth";
import { Observable } from "rxjs";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    SignIn(auth: SignIn): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Auth/SignIn`, auth);
    }

    SignUp(auth: SignUp): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Auth/SignUp`, auth);
    }

    RecoverPassword(auth: RecoverPassword): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Auth/RecoverPassword`, auth);
    }

    GetMe():Observable<ServiceResponse> //: Observable<Me[]>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/Auth/Me`);
    }
}
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AddCategory } from "../Models/Category";
import { ServiceResponse } from "../Models/ServiceResponse";

@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    private apiUrl = environment.api

    constructor(private httpClient : HttpClient){
    }

    GetAllCategories(): Observable<ServiceResponse>
    {
        return this.httpClient.get<ServiceResponse>(`${this.apiUrl}/api/Category`);
    }

    AddCategory(categoryData: AddCategory): Observable<ServiceResponse>
    {
        return this.httpClient.post<ServiceResponse>(`${this.apiUrl}/api/Category`,categoryData);
    }

    GetSingleCategory(id: number): Observable<ServiceResponse>
    {
        const url = `${this.apiUrl}/api/Category/${id}`;
        return this.httpClient.get<ServiceResponse>(url);
    }

    DeleteCategory(id: number): Observable<ServiceResponse>
{
    const url = `${this.apiUrl}/api/Category/${id}`;
    return this.httpClient.delete<ServiceResponse>(url);
}
}
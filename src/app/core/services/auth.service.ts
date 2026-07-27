import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginRequest } from "../../shared/models/login-request";
import { Observable } from "rxjs";
import { LoginResponse } from "../../shared/models/login-response";
import { environment } from "../../../environments/environment";
import { ApiResponse } from "../../shared/models/api-response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient)

    login(request: LoginRequest) {
        return this.http.post<ApiResponse<LoginResponse>>(`${environment.apiBaseUrl}/login`, request) 
    }
}
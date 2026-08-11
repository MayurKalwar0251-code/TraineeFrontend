import { inject, Injectable } from "@angular/core"
import { LoginRequest } from "../../../../shared/models/login-request"
import { environment } from "../../../../../environments/environment";
import { ApiResponse } from "../../../../shared/models/api-response";
import { LoginResponse } from "../../../../shared/models/login-response";
import { ApiService } from "../../../../core/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private readonly url = `${environment.apiBaseUrl}/login`;
    private readonly api = inject(ApiService);

    login(request: LoginRequest) {
        return this.api.post<ApiResponse<LoginResponse>>(this.url, request);
    }
}
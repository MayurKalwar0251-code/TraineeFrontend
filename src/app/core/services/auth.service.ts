import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { LoginRequest } from "../../shared/models/login-request";
import { Observable } from "rxjs";
import { LoginResponse } from "../../shared/models/login-response";
import { environment } from "../../../environments/environment";
import { ApiResponse } from "../../shared/models/api-response";
import { StorageService } from "./storage.service";
import { UserDto } from "../../shared/models/user-dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    private storage = inject(StorageService)
    private _token = signal<string | null>(this.storage.getToken())
    private _user = signal<UserDto | null>(this.storage.getUser())
    
    readonly token = this._token.asReadonly()
    readonly user = this._user.asReadonly()

    isLoggedIn(): boolean {
        return this.storage.getToken() !== null
    }

    login(token: string,user: UserDto): void {
        this.storage.setToken(token)
        this.storage.setUser(user)

        this._token.set(token)
        this._user.set(user)
    }

    logout(): void {
        this.storage.clear()

        this._token.set(null)
        this._user.set(null)
    }

    getUser(): UserDto | null{
        return this._user()
    }

    getRole(): string | null{
        return this._user()?.role ?? null
    }

}
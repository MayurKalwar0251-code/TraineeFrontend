import { Injectable } from "@angular/core"
import { UserDto } from "../../shared/models/user-dto"

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly TOKEN_KEY = 'jwt'
    private readonly USER_KEY = 'user'


    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token)
    }

    setUser(user: UserDto) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }

    getUser(): UserDto | null {
        const value = localStorage.getItem(this.USER_KEY)
        if(!value) return null
        return JSON.parse(value)
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY)
    }

    clear(): void {
        localStorage.removeItem(this.TOKEN_KEY)
        localStorage.removeItem(this.USER_KEY)
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null
    }

    logout(): void {
        this.clear()
    }
}
import { inject, Injectable } from "@angular/core"
import { StorageService } from "./storage.service"

export type UserRole = 'Admin' | 'Mentor' | 'Trainee'

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private storage = inject(StorageService)

    getRole(): UserRole | null {
        const user =this.storage.getUser()

        return user?.role as UserRole ?? null
    }

    isAdmin(): boolean {
        return this.getRole() === 'Admin'
    }

    isMentor(): boolean {
        return this.getRole() === 'Mentor'
    }

    isTrainee(): boolean {
        return this.getRole() === 'Trainee'
    }

}
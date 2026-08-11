import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const roleGuard: CanActivateFn = (route) => {

    const authService = inject(AuthService)
    const router = inject(Router)

    const allowedRoutes = route.data['roles'] as string[] | undefined

    const currentRole = authService.getRole()

    if (currentRole && allowedRoutes?.includes(currentRole)) {
        return true
    }

    return router.createUrlTree(['/dashboard'])
}
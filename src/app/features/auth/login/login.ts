import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Fixed import path
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class LoginComponent {
  private fb = inject(FormBuilder).nonNullable
  private authService = inject(AuthService)
  private storageService = inject(StorageService)
  private router = inject(Router)

  isLoading = false
  errorMessage = ""

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    passwordHash: ['', [Validators.required]],
    username: ['', [Validators.required]],
  })

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }
    this.isLoading = true
    this.errorMessage = ""

    this.authService.login(this.loginForm.getRawValue())
      .pipe(
        finalize(() => {
          this.isLoading = false
        })
      )
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.errorMessage = response.message || "Login Failed"
            return
          }
          this.storageService.setToken(response.data.token)
          this.storageService.setUser(response.data.userDto)
          this.router.navigate(['/dashboard'])
        },

        error: (error) => {
          this.errorMessage = error.error?.message ?? "Unable to connect to the server. Please try again"
        },
      })
  }
}
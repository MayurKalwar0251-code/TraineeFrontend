import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  private storage = inject(StorageService)
  private router = inject(Router)

  logout(): void {
    this.storage.logout()
    this.router.navigate(['/login'])
  }
}

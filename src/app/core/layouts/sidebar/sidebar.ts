import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarItem } from '../../../shared/models/sidebar-item';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  menuItems: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard'
    },
    {
      label: 'Trainees',
      icon: '📊',
      route: '/trainees'
    },
    {
      label: 'Mentors',
      icon: '📊',
      route: '/mentors'
    },
    {
      label: 'Learning Tasks',
      icon: '📊',
      route: '/learning-task'
    },
    {
      label: 'Assignments',
      icon: '📊',
      route: '/assignments'
    },
    {
      label: 'Reviews',
      icon: '📊',
      route: '/reviews'
    },
  ]
}

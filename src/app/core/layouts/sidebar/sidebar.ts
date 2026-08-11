import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarItem } from '../../../shared/models/sidebar-item';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive],
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {

  roleService = inject(RoleService)

  menuItems = computed(()=>{
    switch (this.roleService.getRole()){
      case 'Admin':
        return this.adminMenu
      case 'Mentor':
        return this.mentorMenu
      case 'Trainee':
        return this.traineeMenu
      default:
        return []
    }
  }) 

  adminMenu: SidebarItem[] = [
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
      label: 'Profile',
      icon: '📊',
      route: '/profile'
    },
  ]

  mentorMenu: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard'
    },
    {
      label: 'My Trainees',
      icon: '📊',
      route: '/trainees'
    },
    {
      label: 'Assignments',
      icon: '📊',
      route: '/assignments'
    },
    {
      label: 'Profile',
      icon: '📊',
      route: '/profile'
    },
  ]

  traineeMenu: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard'
    },
    {
      label: 'My Assignments',
      icon: '📊',
      route: '/assignments'
    },
    {
      label: 'Profile',
      icon: '📊',
      route: '/profile'
    },
  ]
}

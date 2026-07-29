import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth-guard';
import { TraineeListComponent } from './features/trainees/pages/trainee-list/trainee-list';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],

    children: [

      {
        path: '',
        redirectTo: "dashboard",
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: "trainees",
        loadComponent: () => import('./features/trainees/pages/trainee-list/trainee-list').then(c => c.TraineeListComponent)
      },

      {
        path: "mentors",
        loadComponent: () => import('./features/mentors/pages/mentor-list/mentor-list').then(c => c.MentorListComponent)
      },

      {
        path: "learning-task",
        loadComponent: () => import('./features/learning-tasks/pages/learning-task-list/learning-task-list').then(c => c.LearningTaskListComponent)
      }

    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];
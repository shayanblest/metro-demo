import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./features/auth/pages/sign-in/sign-in.component').then(m => m.SignInComponent),
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
      }
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'demo',
        loadComponent: () => import('./shared/components/demo/demo.component').then(m => m.DemoComponent),
      },
      {
        path: "dashboard",
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component').then(c => c.DashboardComponent)
      },
      {
        path: "users",
        children: [
          {
            path: "list",
            loadComponent: () => import('./features/auth/pages/users/users-list/users-list.component').then(c => c.UsersListComponent)
          },
          {
            path: "add",
            loadComponent: () => import('./features/auth/pages/users/edit-user/edit-user.component').then(c => c.EditUserComponent)
          },
          {
            path: "edit/:id",
            loadComponent: () => import('./features/auth/pages/users/edit-user/edit-user.component').then(c => c.EditUserComponent)
          },
        ]
      },
      {
        path: "roles",
        children: [
          {
            path: "list",
            loadComponent: () => import('./features/auth/pages/roles/roles-list/roles-list.component').then(c => c.RolesListComponent)
          },
          {
            path: "edit",
            loadComponent: () => import('./features/auth/pages/roles/edit-role/edit-role.component').then(c => c.EditRoleComponent)
          },
          {
            path: "edit/:id",
            loadComponent: () => import('./features/auth/pages/roles/edit-role/edit-role.component').then(c => c.EditRoleComponent)
          },
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
];

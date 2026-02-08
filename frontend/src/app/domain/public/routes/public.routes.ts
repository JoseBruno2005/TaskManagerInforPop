import { Routes } from '@angular/router';
import { publicGuard } from '../../../shared/guards/public.guard';

export const PUBLIC_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('../pages/login/login.component')
        .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('../pages/register/register.component')
        .then(m => m.RegisterComponent)
  },
];

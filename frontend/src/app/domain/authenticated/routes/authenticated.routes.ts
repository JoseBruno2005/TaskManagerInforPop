import { Routes } from '@angular/router';
import { authGuard } from '../../../shared/guards/auth.guard';

export const AUTHENTICATED_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../pages/home/home.component')
        .then(m => m.HomeComponent)
  }
];
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./domain/public/routes/public.routes')
        .then(r => r.PUBLIC_ROUTES),
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./domain/admin/routes/admin.routes')
        .then(r => r.ADMIN_ROUTES)
  },
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('./domain/authenticated/routes/authenticated.routes')
        .then(r => r.AUTHENTICATED_ROUTES)
  }
];

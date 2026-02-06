import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./domain/public/routes/public.routes')
        .then(r => r.PUBLIC_ROUTES),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./domain/admin/routes/admin.routes')
        .then(r => r.ADMIN_ROUTES)
  },
  {
    path: '',
    loadChildren: () =>
      import('./domain/authenticated/routes/authenticated.routes')
        .then(r => r.AUTHENTICATED_ROUTES)
  }
];

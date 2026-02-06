import { Routes } from '@angular/router';
import { adminGuard } from '../../../shared/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'tasks/create',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('../pages/task-create/task-create.component')
        .then(m => m.TaskCreateComponent)
  },
  {
    path: 'task/edit/:id',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('../pages/task-edit/task-edit.component')
        .then(m => m.TaskEditComponent)
  }
];
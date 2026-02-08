import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, Signal } from "@angular/core";
import { Task } from "../../../../shared/types/tasks/task.types";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { Router } from "@angular/router";
import { AuthUser } from "../../../../shared/types/users/user.types";
import { StorageKeys, StorageUtil } from "../../../../shared/utils/storage.utils";

@Component({
    standalone: true,
    selector: 'app-home',
    imports: [CommonModule],
    templateUrl: '../home/home.component.html'
})
export class HomeComponent implements OnInit {


    tasks = signal<Task[]>([]);
    loading = signal(true);
    errorMessage = signal('');

    showDeleteModal = signal(false);
    taskIdDelete = signal<string | null>('');

    titleFilter = signal('');
    statusFilter = signal('');

    isAdmin = signal(false);

    authenticatedUser = signal<AuthUser | null>(null);


    constructor(
        private taskService: TaskService,
        private authService: AuthService,
        private router: Router
    ) { }


    ngOnInit(): void {
        this.isAdmin.set(this.authService.isAdmin())

        this.authenticatedUser.set(StorageUtil.get<AuthUser>(StorageKeys.USER));

        this.loadTasks();
    }

    goToCreateTask() {
        this.router.navigate(['/admin/tasks/create'])
    }

    goToEditTask(id: string) {
        this.router.navigate([`/admin/task/edit/${id}`])
    }

    handleDeleteTask(id: string) {
        this.taskIdDelete.set(id);
        this.showDeleteModal.set(true);
    }

    closeModal() {
        this.showDeleteModal.set(false);
        this.taskIdDelete.set(null);
    }


    confirmDeleteTask() {
        const id = this.taskIdDelete();

        if (id) {
            this.loading.set(true);
            this.taskService.delete(id).subscribe({
                next: () => {
                    this.loadTasks();
                    this.closeModal();
                }, error: (error) => {
                    this.errorMessage.set(error.message);
                    this.loading.set(false);
                    this.closeModal();
                }
            })
        }
    }

    loadTasks() {
        this.loading.set(true);

        const filters = {
            title: this.titleFilter() || undefined,
            status: this.statusFilter() || undefined
        };

        const request$ = this.isAdmin()
            ? this.taskService.findAll(filters)
            : this.taskService.findMyTasks(filters);

        request$.subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                this.loading.set(false);
            },
            error: (error) => {
                this.errorMessage.set(error.message);
                this.loading.set(false);
            }
        });
    }

}
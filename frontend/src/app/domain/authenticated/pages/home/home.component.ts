import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, Signal } from "@angular/core";
import { Task } from "../../../../shared/types/tasks/task.types";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { Router } from "@angular/router";

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

    titleFilter = signal('');
    statusFilter = signal('');

    isAdmin = signal(false);


    constructor(
        private taskService: TaskService,
        private authService: AuthService,
        private router: Router
    ){}


    ngOnInit(): void {
        this.isAdmin.set(this.authService.isAdmin())
        this.loadTasks();
    }

    goToCreateTask(){
        this.router.navigate(['/admin/tasks/create'])
    }

    goToEditTask(id: string){
        this.router.navigate([`/admin/task/edit/${id}`])
    }

    loadTasks(){

        this.loading.set(true);

        this.taskService.findAll({
            title: this.titleFilter() || undefined,
            status: this.statusFilter() || undefined
        }).subscribe({
            next: (tasks) => {
                this.tasks.set(tasks);
                console.log(this.tasks)
                this.loading.set(false);
            },
            error: (error) => {
                console.log(this.errorMessage);
                this.errorMessage = error.message;
                this.loading.set(false);
            }
        });
    }

}
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CreateTaskRequest } from "../../../../shared/types/tasks/task.types";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-task-create',
    imports: [FormsModule, CommonModule],
    templateUrl: '../task-create/task-create.component.html'
})
export class TaskCreateComponent {
    loading = false;
    errorMessage = '';

    task: CreateTaskRequest = {
        title: '',
        description: '',
        status: 'PENDING',
        assignedUser: ''
    };

    constructor(
        private taskService: TaskService,
        private router: Router
    ) { }

    submit() {
        this.loading = true;

        this.taskService.create(this.task).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.errorMessage = error.message;
                this.loading = false;
            }
        })
    }
}
import { Component, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CreateTaskRequest, TaskStatus } from "../../../../shared/types/tasks/task.types";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserService } from "../../../../shared/services/users/user.service";
import { UserResponse } from "../../../../shared/types/users/user.types";
import { InputComponent } from "../../../../shared/components/input/input.component";

@Component({
    standalone: true,
    selector: 'app-task-create',
    imports: [ReactiveFormsModule, CommonModule, InputComponent],
    templateUrl: '../task-create/task-create.component.html'
})
export class TaskCreateComponent implements OnInit {
    loading = false;
    errorMessage = signal('');

    userList = signal<UserResponse[]>([]);

    form = new FormGroup({
        title: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(3)
            ]
        }),
        description: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(10)
            ]
        }),
        assignedUser: new FormControl<string | null>(null)
    });

    constructor(
        private taskService: TaskService,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.userService.findAll().subscribe({
            next: (users) => {
                this.userList.set(users.filter((u) => u.role === 'USER'))
            },
            error: (error) => {
                this.errorMessage.set(error.message);
            }
        })
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        const payload: CreateTaskRequest = {
            title: this.form.value.title!,
            description: this.form.value.description!,
            assignedUser: this.form.value.assignedUser || undefined
        };

        this.loading = true;

        this.taskService.create(payload).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
            error: (error) => {
                this.errorMessage.set(error.message);
                this.loading = false;
            }
        })
    }
}
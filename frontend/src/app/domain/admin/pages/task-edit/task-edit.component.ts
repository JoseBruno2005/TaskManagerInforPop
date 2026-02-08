import { Component, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { UpdateTaskRequest } from "../../../../shared/types/tasks/task.types";
import { UserService } from "../../../../shared/services/users/user.service";
import { UserResponse } from "../../../../shared/types/users/user.types";
import { InputComponent } from "../../../../shared/components/input/input.component";

@Component({
  standalone: true,
  selector: 'app-task-edit',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent
  ],
  templateUrl: '../task-edit/task-edit-component.html'
})
export class TaskEditComponent implements OnInit {

  taskId!: string;

  loading = signal(true);
  errorMessage = signal('');

  userList = signal<UserResponse[]>([]);

  task = signal<UpdateTaskRequest>({
    title: '',
    description: '',
    status: 'PENDING',
    assignedUser: ''
  });

  form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(3)
      ]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.minLength(10)
      ]
    }),
    status: new FormControl('PENDING', {
      nonNullable: true
    }),
    assignedUser: new FormControl<string | null>(null)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.loadTask();

    this.userService.findAll().subscribe({
      next: (users) => {
        this.userList.set(users.filter((u) => u.role === "USER"))
      },
      error: (error) => {
        this.errorMessage.set(error.message);
      }
    })
  }

  loadTask() {
    this.taskService.findById(this.taskId).subscribe({
      next: task => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          assignedUser: task.assignedUser?.publicId ?? null
        });
        this.loading.set(false);
      },
      error: err => {
        this.errorMessage.set(err.message);
        this.loading.set(false);
      }
    });
  }

  submit() {
    const payload = {
      ...this.form.value,
      title: this.form.value.title?.trim() || null,
      description: this.form.value.description?.trim() || null,
      assignedUser: this.form.value.assignedUser || null
    };

    this.taskService.updated(this.taskId, payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
      }
    });
  }
}

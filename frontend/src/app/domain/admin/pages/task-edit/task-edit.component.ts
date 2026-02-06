import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../../../shared/services/tasks/task.service";
import { UpdateTaskRequest } from "../../../../shared/types/tasks/task.types";

@Component({
  standalone: true,
  selector: 'app-task-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: '../task-edit/task-edit-component.html'
})
export class TaskEditComponent implements OnInit {

  taskId!: string;

  loading = signal(true);
  errorMessage = signal('');

  task = signal<UpdateTaskRequest>({
    title: '',
    description: '',
    status: 'PENDING'
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.loadTask();
  }

  loadTask() {
    this.taskService.findById(this.taskId).subscribe({
      next: (task) => {
        this.task.set({
          title: task.title,
          description: task.description,
          status: task.status,
          assignedUser: task.assignedUser?.publicId
        });
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      }
    });
  }

  submit() {
    this.taskService.updated(this.taskId, this.task()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
      }
    });
  }
}

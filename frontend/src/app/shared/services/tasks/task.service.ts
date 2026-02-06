import { Injectable } from "@angular/core";
import { RequestService } from "../request.service";
import { Observable } from "rxjs";
import { CreateTaskRequest, Task, UpdateTaskRequest } from "../../types/tasks/task.types";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private request: RequestService) { }

    findAll(filters?: { title?: string; status?: string }): Observable<Task[]> {
        return this.request.get<Task[]>('/task', filters);
    }

    findById(id: string): Observable<Task> {
        return this.request.get<Task>(`/task/${id}`);
    }

    create(data: CreateTaskRequest): Observable<Task> {
        return this.request.post<Task>(`/task/register`, data);
    }

    updated(id: string, data: UpdateTaskRequest): Observable<Task> {
        return this.request.put<Task>(`/task/${id}`, data)
    }

    delete(id: string): Observable<void> {
        return this.request.delete<void>(`/task/${id}`);
    }
}
import { AuthUser } from "../users/user.types";

export type TaskStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELED';


export interface Task {
  publicId: string;
  title: string;
  description: string;
  status: TaskStatus;
  creator: AuthUser;
  assignedUser?: AuthUser;
}

export interface CreateTaskRequest {
    title: string;
    description: string;
    assignedUser?: string;
}

export interface UpdateTaskRequest {
    title?: string | null;
    description?: string | null;
    status?: string | null;
    assignedUser?: string | null;
}
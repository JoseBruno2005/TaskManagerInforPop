export type UserRole = 'ADMIN' | 'USER';

export interface CreateUserRequest {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

export interface UserResponse {
  publicId: string;
  name: string;
  role: UserRole;
}

export interface AuthUser {
  publicId: string;
  name: string;
  role: 'ADMIN' | 'USER';
}
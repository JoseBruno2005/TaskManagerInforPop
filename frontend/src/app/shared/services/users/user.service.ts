import { Injectable } from "@angular/core";
import { CreateUserRequest, UserResponse } from "../../types/users/user.types";
import { RequestService } from "../request.service";

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private request: RequestService) { }

  register(data: CreateUserRequest) {
    return this.request.post<UserResponse>(
      '/users/register',
      data
    );
  }

  findAll() {
    return this.request.get<UserResponse[]>(
      '/users'
    )
  }
}
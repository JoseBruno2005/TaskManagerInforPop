import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/users/user.service';
import { CreateUserRequest } from '../../../../shared/types/users/user.types';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule]
})
export class RegisterComponent {

  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  submit(form: CreateUserRequest) {
    this.userService.register(form).subscribe({
      next: (res) => {
        console.log('Usuário criado:', res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(this.errorMessage);
        this.errorMessage = this.errorMessage;
      }
    });
  }
}

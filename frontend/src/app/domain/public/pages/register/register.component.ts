import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../shared/services/users/user.service';
import { CreateUserRequest, UserRole } from '../../../../shared/types/users/user.types';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, InputComponent]
})
export class RegisterComponent {

  errorMessage = signal('');

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/
        )
      ]
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    role: new FormControl<UserRole>("USER", {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  submit() {

    const payload: CreateUserRequest = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      name: this.form.value.name!,
      role: this.form.value.role!
    }

    this.userService.register(payload).subscribe({
      next: (res) => {
        console.log('Usuário criado:', res);
        this.router.navigate(['auth/login']);
      },
      error: (error) => {
        console.log(this.errorMessage);
        this.errorMessage.set(error.message);
      }
    });
  }
}

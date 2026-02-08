import { Router } from "@angular/router";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { LoginRequest } from "../../../../shared/types/auth/auth.types";
import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../../../shared/components/input/input.component";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, InputComponent],
    templateUrl: '../login/login.component.html',
})
export class LoginComponent {

    errorMessage = signal('');


    form = new FormGroup({
        email: new FormControl('', { 
            nonNullable: true,
            validators: [Validators.required, Validators.email]
         }),
        password: new FormControl('', { 
            nonNullable: true ,
            validators: [Validators.required]
        }),
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }



    submit() {

        const payload: LoginRequest = {
            email: this.form.value.email!,
            password: this.form.value.password!
        } 

        this.authService.login(payload).subscribe({
            next: (res) => {
                console.log('Usuário logado:', res);
                this.router.navigate(['/'])
            },
            error: (error) => {
                console.log(this.errorMessage);
                this.errorMessage.set(error.message);
            }
        })
    }
}
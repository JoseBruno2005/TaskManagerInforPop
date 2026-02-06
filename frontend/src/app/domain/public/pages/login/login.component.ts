import { Router } from "@angular/router";
import { AuthService } from "../../../../shared/services/auth/auth.service";
import { LoginRequest } from "../../../../shared/types/auth/auth.types";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: '../login/login.component.html',
})
export class LoginComponent {

    errorMessage: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    submit(form: LoginRequest){
        this.authService.login(form).subscribe({
            next: (res) => {
                console.log('Usuário logado:', res);
                this.router.navigate(['/'])
            },
            error: (error) => {
                console.log(this.errorMessage);
                this.errorMessage = error.message;
            }
        })
    }
}
import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthUser } from '../../types/users/user.types';
import { StorageKeys, StorageUtil } from '../../utils/storage.utils';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
})
export class Navbar implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  user = signal<AuthUser | null>(null);

  ngOnInit(): void {
    this.user.set(StorageUtil.get(StorageKeys.USER));
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

  goToHome() {
    this.router.navigate([''])
  }


}

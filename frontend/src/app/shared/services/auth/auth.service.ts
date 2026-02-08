import { tap } from "rxjs";
import { LoginRequest, LoginResponse } from "../../types/auth/auth.types";
import { RequestService } from "../request.service";
import { Injectable } from "@angular/core";
import { StorageKeys, StorageUtil } from "../../utils/storage.utils";
import { AuthUser } from "../../types/users/user.types";
import { getTokenExpiration } from "../../utils/getTokenExpiration.utils";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private request: RequestService) { }

    private logoutTimer: any;

    login(data: LoginRequest) {
        return this.request.post<LoginResponse>(
            '/auth/login', data
        ).pipe(
            tap(res => {
                StorageUtil.set(StorageKeys.TOKEN, res.token);
                StorageUtil.set(StorageKeys.USER, res.userDto)
            })
        );
    }

    logout() {
        StorageUtil.remove(StorageKeys.TOKEN);
        StorageUtil.remove(StorageKeys.USER);
    }

    scheduleAutoLogout(token: string) {
        const expiration = getTokenExpiration(token);

        if (!expiration) {
            this.logout();
            return;
        }

        const expiresIn = expiration - Date.now();

        if (expiresIn <= 0) {
            this.logout();
            return;
        }

        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, expiresIn);
    }

    getToken() {
        return StorageUtil.get(StorageKeys.TOKEN);
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    isAdmin(): boolean {
        const user = StorageUtil.get<AuthUser>(StorageKeys.USER);
        return user?.role === "ADMIN";
    }
}
import { tap } from "rxjs";
import { LoginRequest, LoginResponse } from "../../types/auth/auth.types";
import { RequestService } from "../request.service";
import { Injectable } from "@angular/core";
import { StorageKeys, StorageUtil } from "../../utils/storage.utils";
import { AuthUser } from "../../types/users/user.types";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private request: RequestService) { }

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

    logout(){
        StorageUtil.remove(StorageKeys.TOKEN);
        StorageUtil.remove(StorageKeys.USER);
    }

    getToken(){
        return StorageUtil.get(StorageKeys.TOKEN);
    }

    isAuthenticated(){
        return !!this.getToken();
    }

    isAdmin(): boolean {
        const user = StorageUtil.get<AuthUser>(StorageKeys.USER);
        return user?.role === "ADMIN";
    }
}
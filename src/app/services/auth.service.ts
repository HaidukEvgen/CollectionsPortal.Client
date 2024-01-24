import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  logout() {
    sessionStorage.clear();
  }

  getUsername() {
    const tokenPayload = this.decodeToken();
    if (tokenPayload) {
      return tokenPayload.name;
    }
  }

  private decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }
}

import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const roleTypeInToken =
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const adminRole = 'Admin';

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

  isUserWithName(creatorName: string) {
    const tokenPayload = this.decodeToken();
    if (tokenPayload) {
      return tokenPayload.name == creatorName;
    }
    return false;
  }

  isAdmin() {
    const tokenPayload = this.decodeToken();
    if (tokenPayload) {
      const role = tokenPayload[roleTypeInToken];
      return role == adminRole;
    }
    return false;
  }
}

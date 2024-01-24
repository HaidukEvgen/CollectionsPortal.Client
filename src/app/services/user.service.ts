import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserLoginModel, UserRegisterModel } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = `${environment.apiURL}/users`;

  constructor(private http: HttpClient) {}

  login(userLoginModel: UserLoginModel) {
    return this.http.post<any>(`${this.apiUrl}/login`, userLoginModel);
  }

  register(userRegisterModel: UserRegisterModel) {
    return this.http.post<any>(`${this.apiUrl}/register`, userRegisterModel);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  setStatuses(userIds: string[], status: number) {
    return this.http.patch<any>(`${this.apiUrl}/status/${status}`, userIds);
  }

  deleteUsers(userIds: string[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: userIds
    };
    return this.http.delete<any>(`${this.apiUrl}`, options);
  }
}

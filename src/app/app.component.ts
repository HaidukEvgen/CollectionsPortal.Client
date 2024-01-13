import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface User {
  status: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getForecasts();
  }

  getForecasts() {
    this.http.get<User[]>('https://collections-portal-api.azurewebsites.net/api/users').subscribe(
      (result) => {
        this.users = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'CollectionsPortal.Client';
}

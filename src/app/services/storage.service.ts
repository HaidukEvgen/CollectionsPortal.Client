import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private username$ = new BehaviorSubject<string>("");
  constructor() { }
  
  public getUsername(){
    return this.username$.asObservable();
  }

  public setUsername(username: string){
    this.username$.next(username);
  }
}

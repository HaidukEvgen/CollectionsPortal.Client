import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collection, Item, NewCollection, NewItem } from '../models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  apiUrl = `${environment.apiURL}/collections`;

  constructor(private http: HttpClient) {}

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.apiUrl);
  }

  getCollection(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${collectionId}`);
  }

  createCollection(newCollection: NewCollection): Observable<any> {
    return this.http.post(this.apiUrl, newCollection);
  }

  updateCollection(collectionId: number, newCollection: NewCollection): Observable<any> {
    return this.http.put(`${this.apiUrl}/${collectionId}`, newCollection);
  }

  deleteCollection(collectionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${collectionId}`);
  }

  getAllCollectionItems(collectionId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/${collectionId}/items`);
  }

  getCollectionItem(collectionId: number, itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${collectionId}/items/${itemId}`);
  }

  addCollectionItem(collectionId: number, newItem: NewItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/${collectionId}/items`, newItem);
  }

  updateCollectionItem(collectionId: number, itemId: number, newItem: NewItem): Observable<any> {
    return this.http.put(`${this.apiUrl}/${collectionId}/items/${itemId}`, newItem);
  }

  deleteCollectionItem(collectionId: number, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${collectionId}/items/${itemId}`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Collection, Item, ItemGeneralinfo, NewCollection, NewItem, Tag } from '../models/collection.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  apiUrl = `${environment.apiURL}`;

  constructor(private http: HttpClient) {}

  getCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/collections`);
  }

  getCollection(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/collections/${collectionId}`);
  }

  createCollection(newCollection: FormData){
    return this.http.post(`${this.apiUrl}/collections`, newCollection);
  }

  updateCollection(collectionId: number, newCollection: NewCollection) {
    return this.http.put(`${this.apiUrl}/collections/${collectionId}`, newCollection);
  }

  deleteCollection(collectionId: number) {
    return this.http.delete(`${this.apiUrl}/collections/${collectionId}`);
  }

  getLatestItems(amount: number = 5): Observable<ItemGeneralinfo[]> {
    return this.http.get<ItemGeneralinfo[]>(`${this.apiUrl}/collections/latest-items?amount=${amount}`);
  }

  getAllCollectionItems(collectionId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/collections/${collectionId}/items`);
  }

  getCollectionItem(collectionId: number, itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/collections/${collectionId}/items/${itemId}`);
  }

  addCollectionItem(collectionId: number, newItem: NewItem) {
    return this.http.post(`${this.apiUrl}/collections/${collectionId}/items`, newItem);
  }

  updateCollectionItem(collectionId: number, itemId: number, newItem: NewItem) {
    return this.http.put(`${this.apiUrl}/collections/${collectionId}/items/${itemId}`, newItem);
  }

  deleteCollectionItem(collectionId: number, itemId: number){
    return this.http.delete(`${this.apiUrl}/collections/${collectionId}/items/${itemId}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/tags`);
  }
}

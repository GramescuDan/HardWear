import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get<IUser[]>(`${environment.apiUrl}/users`);
  }

  register(user: IUser) {
    return this._http.post(`${environment.apiUrl}/users`, user);
  }

  put(id: number, user: IUser) {
    return this._http.put(`${environment.apiUrl}users/${id}`, user);
  }

  saveToFav(userId: number, itemId: number) {
    return this._http
      .post(`${environment.apiUrl}items/saveFavourite/${userId}/${itemId}`, null)
      .pipe(tap(console.log));
  }

  removeFromFav(userId: number, itemId: number) {
    return this._http
      .post(`${environment.apiUrl}items/removeFavourite/${userId}/${itemId}`, null)
      .pipe(tap(console.log));
  }
}

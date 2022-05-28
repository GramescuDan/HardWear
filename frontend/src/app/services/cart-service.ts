import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Item } from "../models/Item";
import { catchError, Observable, of, tap } from "rxjs";

const apiUrl = environment.apiUrl + "carts";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private readonly _http: HttpClient) {
  }

  add(item: Item, cartId: number) {
    const url = `${apiUrl}/addItem/${item.id}/${cartId}`
    localStorage.setItem('cart', JSON.stringify([...JSON.parse(localStorage.getItem('cart') ?? '[]'), item]))
    return this._http.post(url, item).pipe(tap(console.log))
  }

  remove(itemId: number, cartId: number) {
    const url = `${apiUrl}/removeItem/${itemId}/${cartId}`
    localStorage.setItem('cart', JSON.stringify((JSON.parse(localStorage.getItem('cart') ?? '[]') as Item[]).filter(i => i.id !== itemId)))
    return this._http.post(url, {}).pipe(tap(console.log))
  }

  get(cartId: number): Observable<Item[]> {
    return this._http.get<Item[]>(apiUrl + '/' + cartId, {}).pipe(catchError(() => of(JSON.parse(localStorage.getItem('cart') as string))), tap(console.log))
  }
}

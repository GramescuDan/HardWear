import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/Item';
import { BehaviorSubject, catchError, map, Observable, of, pipe, switchMap, tap } from 'rxjs';
import { ICart } from '../models/cart';

const apiUrl = environment.apiUrl + 'carts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items$ = new BehaviorSubject<Item[]>([]);

  constructor(private readonly _http: HttpClient) {}

  add(item: Item, cartId: number) {
    const url = `${apiUrl}/addItem/${item.id}/${cartId}`;
    localStorage.setItem(
      'cart',
      JSON.stringify([...JSON.parse(localStorage.getItem('cart') ?? '[]'), item]),
    );
    return this._http.post(url, item).pipe(this.#reloadItemsAfterRequest(cartId));
  }

  remove(itemId: number, cartId: number) {
    const url = `${apiUrl}/removeItem/${itemId}/${cartId}`;
    localStorage.setItem(
      'cart',
      JSON.stringify(
        (JSON.parse(localStorage.getItem('cart') ?? '[]') as Item[]).filter(i => i.id !== itemId),
      ),
    );
    return this._http.post(url, {}).pipe(this.#reloadItemsAfterRequest(cartId));
  }

  get(cartId: number): Observable<Item[]> {
    return this._http.get<ICart>(apiUrl + '/' + cartId, {}).pipe(
      map(cart => cart.cartItems),
      catchError(() => of(JSON.parse(localStorage.getItem('cart') as string))),
      tap(console.log),
    );
  }

  loadItems(cartId: number) {
    return this.get(cartId).pipe(tap(items => this.items$.next(items)));
  }

  #reloadItemsAfterRequest(cartId: number) {
    return pipe(
      catchError(() => of({})),
      tap(console.log),
      switchMap(() => this.loadItems(cartId)),
    );
  }
}

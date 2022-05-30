import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryService } from './category-service';
import { Item } from '../models/Item';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  map,
  Observable,
  of,
  pipe,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';

const apiUrl = environment.apiUrl + 'items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  items$ = new BehaviorSubject<Item[]>([]);
  mock: Item[] = [
    {
      id: 1,
      name: 'Some item',
      price: 12,
      quantity: 13,
      description: 'Some description',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      categories: ['Laptops'],
    },
    {
      id: 2,
      name: 'Some item 2',
      price: 12,
      quantity: 13,
      description: 'Some description 2',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      categories: ['Laptops'],
    },
    {
      id: 3,
      name: 'Some item 3',
      price: 12,
      quantity: 13,
      description: 'Some description 3',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      categories: ['Laptops'],
    },
  ];

  constructor(
    private readonly _http: HttpClient,
    private readonly _categoryService: CategoryService,
  ) {
    firstValueFrom(this.load()).then();
  }

  itemsUpdate(newItems: Item[]) {
    this.items$.next(newItems);
  }

  load(): Observable<Item[]> {
    if (this._categoryService.categories.length == 0) {
      return this._http.get<Item[]>(`${environment.apiUrl}items`).pipe(
        tap(console.log),
        map(items => (items.length ? items : this.mock)),
        tap(items => this.itemsUpdate(items)),
        shareReplay(),
      );
    }
    const url = apiUrl + '/byCategories?categories=';
    const categories = this._categoryService.categories.map(c => encodeURIComponent(c));
    return this._http.get<Item[]>(url + categories.join('&categories=')).pipe(
      tap(console.log),
      map(items => (items.length ? items : this.mock)),
      tap(items => this.itemsUpdate(items)),
      shareReplay(),
    );
  }

  async add(item: Item, file: Blob) {
    let formData = new FormData();
    formData.append('currentFile', file);
    formData.append('item', new Blob([JSON.stringify(item)], { type: 'application/json' }));
    return firstValueFrom(
      this._http.post(apiUrl, formData).pipe(tap(console.log), this.#reloadItemsAfterRequest()),
    );
  }

  update(item: Item) {
    return this._http
      .post(apiUrl + '/' + item.id, item)
      .pipe(tap(console.log), this.#reloadItemsAfterRequest());
  }

  delete(id: number) {
    return this._http
      .delete(apiUrl + '/' + id)
      .pipe(tap(console.log), this.#reloadItemsAfterRequest());
  }

  #reloadItemsAfterRequest() {
    return pipe(
      catchError(() => of({})),
      switchMap(() => this.load()),
    );
  }
}

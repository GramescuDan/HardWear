import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IShopItem} from "../models/shopitem";
import {Observable} from "rxjs";
import {ICategory} from "../models/category";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private readonly _apiUrl = environment.apiUrl + 'categories';

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  get(): Observable<ICategory[]> {
    return this._http.get<ICategory[]>(this._apiUrl);
  }
}

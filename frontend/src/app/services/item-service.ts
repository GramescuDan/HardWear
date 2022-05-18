import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CategoryService} from "./category-service";
import {Item} from "../models/Item";

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  constructor(private _http:HttpClient, private _categ:CategoryService) {
  }
private _api = environment.apiUrl + "/items/byCategories";
  get(){
    let categories = this._categ.categories;

    return this._http.get<Item>(this._api,categories);
  }
}

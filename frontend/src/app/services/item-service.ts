import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {CategoryService} from "./category-service";
import {Item} from "../models/Item";

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  constructor(private _http:HttpClient, private _categ:CategoryService) {
  }
private _api = environment.apiUrl + "items";
public items: Item[];
  get(){
    if(this._categ.categories.length == 0){
      return this._http.get<Item[]>(`${environment.apiUrl}items`);
    }else{
      this._api +="/byCategories?categories=";
      return this._http.get<Item[]>(this._api + this._categ.categories.join("&categories="));
    }

  }
}

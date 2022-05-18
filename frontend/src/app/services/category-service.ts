import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private readonly _apiUrl = environment.apiUrl + 'categories';
  public categories: string[] = [];

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  add(elem: string) {
    this.categories.push(elem);
  }

  remove(elem: string) {
    this.categories = this.categories.filter(c => c !== elem);
  }

  post() {

  }


}

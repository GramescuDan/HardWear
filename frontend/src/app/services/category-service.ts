import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  public categories: string[] = [
    'Laptops',
    'Mobile Phones',
    'Gaming & Office Systems',
    'Components',
    'Gaming',
    'Monitors & Peripheries',
    'Tv & Video',
    'Networking & UPS',
    'Software & Office Supplies',
  ];
  private readonly _apiUrl = environment.apiUrl + 'categories';

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

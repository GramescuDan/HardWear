import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/user";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserService {


  constructor(private _http:HttpClient) {
  }

  getAll(){
    return this._http.get<IUser[]>(`${environment.apiUrl}/users`);
  }

  register(user: IUser){
    return this._http.post(`${environment.apiUrl}/users`,user);
  }

}

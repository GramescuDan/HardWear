import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../models/user";
import {Observable, tap} from "rxjs";
import {GlobalVars} from "./global-vars";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly _apiUrl = environment.apiUrl + 'users/login';

  constructor(
    private readonly _http: HttpClient
  ) {
  }

  post(username: String, password:String): Observable<IUser> {
  return this._http.post<IUser>(this._apiUrl,[username,password]).pipe(tap(user => GlobalVars.user = user))
  }
}

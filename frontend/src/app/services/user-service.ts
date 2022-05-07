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

  post(message: any): Observable<IUser> {
    let user:{ id:any,password: any; role: string; phone: string; localdate: Date; last_name: string; first_name: string; email: string; username: any } = {
      id:null,  
      email:'',
      password: message.password,
      first_name : '',
      last_name : '',
      username: message.username,
      phone : '',
      localdate: new Date(),
      role: ''
    };

  return this._http.post<IUser>(this._apiUrl,user).pipe(tap(user => GlobalVars.user = user));
  }
}

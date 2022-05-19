import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IUser} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthSerivce {
  private readonly _apiUrl = environment.apiUrl + 'users';
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private readonly _http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(((JSON).parse(localStorage.getItem('currentUser')!)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentUserValue(): IUser {
    return this.currentUserSubject.value;
  }
  public update(user:IUser){
    this.currentUserSubject.next(user);
  }

  login(username: string, password: string) {
    let user: IUser = new IUser();

    user.username = username;
    user.password = password;

    let url = this._apiUrl + "/login";
    console.log(url);
    return this._http.post<IUser>(url, user).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));

  }

  register(user: IUser): Observable<IUser> {

    return this._http.post<IUser>(this._apiUrl, user).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}

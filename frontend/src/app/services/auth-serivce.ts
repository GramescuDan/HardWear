import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IUser} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {UserService} from "./user-service";

@Injectable({
  providedIn: 'root'
})

export class AuthSerivce {
  private readonly _apiUrl = environment.apiUrl + 'users';
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    private readonly _http: HttpClient, private _user:UserService
  ) {

    this.currentUserSubject = new BehaviorSubject<IUser>(((JSON).parse(localStorage.getItem('currentUser')!)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentUserValue(): IUser {
    return this.currentUserSubject.value;
  }
  public update(user:IUser){
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this._user.put(user.id,user).subscribe(()=>user);
  }

  public saveFav(iid:number){
  this._user.saveToFav(this.curentUserValue.id,iid).subscribe(user =>
  {
    if (user instanceof IUser) {
      this.currentUserSubject.next(user);
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  })
  }

  public removeFav(iid:number){
    this._user.removeFromFav(this.curentUserValue.id,iid).subscribe(user =>
    {
      if (user instanceof IUser) {
        this.currentUserSubject.next(user);
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
    })
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

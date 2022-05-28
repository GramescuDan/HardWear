import { environment } from "../../environments/environment";
import { BehaviorSubject, firstValueFrom, map, Observable, tap } from "rxjs";
import { IUser } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user-service";

const saveToStorage = (user: IUser) => localStorage.setItem('currentUser', JSON.stringify(user));

@Injectable({
  providedIn: 'root'
})

export class AuthSerivce {
  public currentUser: Observable<IUser>;
  private readonly _apiUrl = environment.apiUrl + 'users';
  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(
    private readonly _http: HttpClient, private _user: UserService
  ) {

    this.currentUserSubject = new BehaviorSubject<IUser>(((JSON).parse(localStorage.getItem('currentUser')!)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get curentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public update(user: IUser) {
    this.currentUserSubject.next(user);
    saveToStorage(user)
    this._user.put(user.id, user).subscribe(() => user);
  }

  public async saveFav(iid: number) {
    const user = await firstValueFrom(this._user.saveToFav(this.curentUserValue.id, iid))
    this.currentUserSubject.next(user);
    saveToStorage(user)
  }

  public async removeFav(iid: number) {
    this.curentUserValue.favouriteItems = this.curentUserValue.favouriteItems.filter(item => item.id !== iid)
    const user = await firstValueFrom(this._user.removeFromFav(this.curentUserValue.id, iid));

    this.currentUserSubject.next(user);
    saveToStorage(user)
  }

  login(username: string, password: string) {
    let user: IUser = new IUser();

    user.username = username;
    user.password = password;

    let url = this._apiUrl + "/login";
    console.log(url);
    return this._http.post<IUser>(url, user).pipe(tap(saveToStorage), map(user => {
      this.currentUserSubject.next(user);
      return user;
    }));

  }

  register(user: IUser): Observable<IUser> {

    return this._http.post<IUser>(this._apiUrl, user).pipe(tap(saveToStorage), map(user => {
      this.currentUserSubject.next(user);
      return user;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}

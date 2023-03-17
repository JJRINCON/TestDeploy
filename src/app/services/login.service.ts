import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterInfo } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  initUserInfo: UserInfo = {
    names: '',
    userID: 0
  }

  private userInfo$ = new BehaviorSubject<UserInfo>(this.initUserInfo)

  constructor(private http: HttpClient) { }

  login(userName: string, password: string){
    return this.http.post("https://localhost:44314/solanum/Login/Access/?userName="+ userName +"&password=" + password, {});
  }

  get actualUserInfo$(): Observable<UserInfo>{
    return this.userInfo$.asObservable();
  }

  setUserInfo(userInfo: UserInfo): void{
    this.userInfo$.next(userInfo);
  }

  register(registerInfo: RegisterInfo){
    return this.http.post("https://localhost:44314/solanum/Login/Register", registerInfo);
  }
}

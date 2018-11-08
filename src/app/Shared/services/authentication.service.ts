import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Configs } from '../../app.config';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CanActivate, Router } from '@angular/router';
@Injectable()
export class AuthenticationService implements CanActivate {

  constructor(
    private http: Http,
    private router: Router
  ) { }
  canActivate() {
    const login = localStorage.getItem('x');
    if (!login) {
      this.router.navigate(['./login']);
    }
    return login ? true : false;
  }
  register(formdata): Observable<any> {
    const url = Configs.USER.register;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }
  login(formdata): Observable<any> {
    const url = Configs.USER.login;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }
  block_User(id): Observable<any> {
    const url = Configs.USER.blockuser;
    return this.http.put(url, { id: id }).map(result => {
      return result.json();
    });
  }

  unblock_User(id): Observable<any> {
    const url = Configs.USER.unblockuser;
    return this.http.put(url, { id: id }).map(result => {
      return result.json();
    });
  }

  get_All_User_User(): Observable<any> {
    const url = Configs.USER.getalluseruser;
    return this.http.get(url).map(result => {
      return result.json();
    });
  }

  refesh_Token_Change_Admin(email): Observable<any> {
    const url = Configs.USER.refeshtokenchangeadmin;
    return this.http.post(url, { email: email }).map(result => {
      return result.json();
    });
  }

  find_User_By_Token(token): Observable<any> {
    const url = Configs.USER.findbytoken;
    return this.http.post(url, { token: token }).map(result => {
      return result.json();
    });
  }

  send_Mail_Change_Admin(formdata): Observable<any> {
    const url = Configs.USER.sendmailchangeadmin;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }

  verify_Change_Admin(formdata): Observable<any> {
    const url = Configs.USER.verifychangeadmin;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }

  forgot_Password(formdata): Observable<any> {
    const url = Configs.USER.forgotpassword;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }

  active(formdata): Observable<any> {
    const url = Configs.USER.active;
    return this.http.post(url, formdata).map(result => {
      return result.json();
    });
  }
  addTokenInHeaderForFile() {
    const headers = new Headers();
    const nameToken = Configs.USER.token;
    const token = localStorage.getItem(nameToken) as string;
    headers.append('x-access-token', token);
    const option = new RequestOptions({ headers: headers });
    return option;
  }

  addTokenInHeader() {
    const headers = new Headers();
    const nameToken = Configs.USER.token;
    const token = localStorage.getItem(nameToken) as string;
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);
    const option = new RequestOptions({ headers: headers });
    return option;
  }
}

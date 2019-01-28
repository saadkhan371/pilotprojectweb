import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../model/user.model';

@Injectable()
export class UserService {

  RestUrl = "http://localhost:9090/api/";

  constructor(private http: Http) { }

  getAllUser(): Observable<User[]> {

    var thisUrl = this.RestUrl + "list";
    return this.http.get(thisUrl)
      .map(this.extractData)
      .catch(this.handleError);

  }

  getUserById(userId: string): Observable<User> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    var thisUrl = this.RestUrl + "get";
    return this.http.get(thisUrl + "/" + userId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createUser(user: User): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    var thisUrl = this.RestUrl + "create";
    return this.http.post(thisUrl, user, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  updateArticle(user: User): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    var thisUrl = this.RestUrl + "update";
    return this.http.post(thisUrl + "/" + user.id, user, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUserById(userId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    var thisUrl = this.RestUrl + "delete";
    return this.http.post(thisUrl+ "/" + userId,options)
      .map(success => success.status)
      .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}

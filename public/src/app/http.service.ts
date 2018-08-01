import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  // Process new user registration
  registerUser(user: any) {
    return this._http.post('/register', user);
  }

  // Process user login request
  loginUser(user: any) {
    return this._http.post('/login', user);
  }
}

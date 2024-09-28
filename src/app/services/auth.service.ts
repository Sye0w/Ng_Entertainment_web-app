import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = 'https://entertainment-web-app-backend-2.onrender.com/api';

  constructor(private http: HttpClient) { }

  signup(user:{email:string, password:string}){
    return this.http.post<{message:string}>(`${this.baseUrl}/register`, user)
  }

  login(user:{email:string, password:string}){
    return this.http.post<{token:string}>(`${this.baseUrl}/login`, user)
  }
}

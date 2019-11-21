import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  url: string = "http://localhost:3000/api/auth";
  isvalidSign(loginData, callback) {
    this.httpClient.post(this.url, loginData).subscribe(responseData => {
      if (responseData && (responseData as any).token) {
        localStorage.setItem('token', (responseData as any).token)
        callback(true)
      } else {
        callback(false)
      }
    }, error => {
      callback(false)
    })
  }

  currentUser() {
    let token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService()
      const user = helper.decodeToken(token)
      user.token = token //to be used in headers
      return user
    } else {
      return null
    }

  }
  isLoggedin() {
    let token = localStorage.getItem('token');
    if (token) {
      return true
    } else {
      return false
    }
  }



}

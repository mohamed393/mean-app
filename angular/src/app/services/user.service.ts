import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://localhost:3000/api/users";

  createNewUser(loginData, callback) {
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
}


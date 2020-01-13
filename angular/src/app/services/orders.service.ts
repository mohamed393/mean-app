import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  gentoken() {
    let token = this.authService.currentUser().token
    let headers = new HttpHeaders().set('x-auth-token', token)
    return headers
  }
  url: string = "http://localhost:3000/api/order";
  createneworder(value, callback) {
    let headers = this.gentoken()
    this.httpClient.post(this.url, value, { headers }).subscribe(data => {
      if (data) {
        callback(true)
      } else {
        callback(false)
      }
    }, error => {
      callback(false)
    })
  }

  getAllOrders() {
    let headers = this.gentoken()
    return this.httpClient.get(this.url, { headers })
  }


}

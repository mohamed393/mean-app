import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  gentoken() {
    let token = this.authService.currentUser().token
    let headers = new HttpHeaders().set('x-auth-token', token)
    return headers
  }
  url: string = "http://localhost:3000/api/product";
  createnewproduct(value, callback) {
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

  getAllproducts() {
    return this.httpClient.get(this.url)
  }
  getoneProduct(id) {
    return this.httpClient.get(this.url + '/' + id)
  }
  updateProduct(id, product) {
    let headers = this.gentoken()
    return this.httpClient.put(this.url + '/' + id, product, { headers })
  }
  deleteProduct(id) {
    let headers = this.gentoken()
    return this.httpClient.delete(this.url + '/' + id, { headers })
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:3000/api/product"

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  createProductValid(productData, callback) {
    const token = this.authService.currentUser().token;
    let headers = new HttpHeaders().set('x-auth-token', token);
    this.httpClient.post(this.url, productData, { headers }).subscribe(responseData => {
      if (responseData) {
        callback(true);
      } else {
        callback(false)
      }
    }, error => {
      callback(false);
    })
  }

  getToken() {
    const token = this.authService.currentUser().token;
    let headers = new HttpHeaders().set('x-auth-token', token);
    return headers
  }
  getAllProducts() {
    let headers = this.getToken()
    return this.httpClient.get(this.url, { headers });
  }

  getOneProduct(productid) {
    let headers = this.getToken()
    return this.httpClient.get(this.url + '/' + productid, { headers });
  }
  deleteOneProduct(id) {
    let headers = this.getToken();
    return this.httpClient.delete(this.url + '/' + id, { headers });
  }

}


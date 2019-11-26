import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient: HttpClient
    , private authService: AuthService) { }
  gentoken() {
    let token = this.authService.currentUser().token
    let headers = new HttpHeaders().set('x-auth-token', token)
    return headers
  }
  url: string = "http://localhost:3000/api/category";
  createnewCategory(value) {
    let headers = this.gentoken()
    return this.httpclient.post(this.url, value, { headers })
  }

  getAllcategories() {
    return this.httpclient.get(this.url)

  }


}

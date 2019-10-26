import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  url: string = "http://localhost:3000/api/category"
  getCategory() {
    return this.httpClient.get(this.url)
  }
}

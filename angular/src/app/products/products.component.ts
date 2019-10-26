import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products = [];
  ngOnInit() {
    this.productService.getAllProducts().subscribe(responseData => {
      this.products = responseData as any
    })
  }

}

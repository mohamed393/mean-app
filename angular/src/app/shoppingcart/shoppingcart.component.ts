import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {

  constructor(private productService: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    let x = localStorage.getItem('cart');
    this.items = x.split(",");// convert string to array//
    for (let i = 0; i < this.items.length; i++) {
      this.productService.getoneProduct(this.items[i]).subscribe(data => {
        this.product = data as any
        this.products = this.products.concat(this.product)
        console.log(this.products)
      })
    }


  }
  items = []
  products = []
  product = []


}

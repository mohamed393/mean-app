import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(responseData => {
      this.filteredProducts = this.products = responseData as any
    })
  }

  products: any[] = [];
  filteredProducts: any[] = [];
  isDelted = false;
  //filter Returns the elements of an array that meet the condition specified in a callback function.//
  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

  delteProduct(product) {
    this.productService.deleteOneProduct(product._id).subscribe(responseDta => {
      if (responseDta) {
        let index = this.filteredProducts.indexOf(product);
        this.products.splice(index, 1);
        this.isDelted = true;

      }
    })
  }

}

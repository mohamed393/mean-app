import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllproducts().subscribe(data => {
      this.fiteredProducts = this.products = data as any
    })
  }
  products: any[] = []
  fiteredProducts: any[] = []
  dataDeleted: string
  filter(query) {
    this.fiteredProducts = query ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      : this.products
  }

  deletepro(p) {
    this.productService.deleteProduct(p._id).subscribe(data => {
      if (data) {
        let index = this.fiteredProducts.indexOf(p);
        this.fiteredProducts.splice(index, 1)
      }
    }, error => {
      console.log(error.message)
    })
  }

}

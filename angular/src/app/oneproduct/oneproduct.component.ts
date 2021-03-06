import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-oneproduct',
  templateUrl: './oneproduct.component.html',
  styleUrls: ['./oneproduct.component.css']
})
export class OneproductComponent implements OnInit {

  constructor(private productService: ProductService
    , private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {

    this.productService.getoneProduct(this.id).subscribe(data => {
      this.product = data


    })

  }
  product = {}
  id = this.route.snapshot.paramMap.get('id')
  cart: string
  ids = []
  uniqueid: boolean;
  y: boolean;

  onClick(id) {
    if (localStorage.getItem('cart')) {
      let x = localStorage.getItem('cart');
      if (x.includes(id)) {
        this.uniqueid = true
      } else {
        x += "," + id;
      }
      localStorage.setItem('cart', x);
    } else {
      let y = id;
      localStorage.setItem('cart', y)

    }
  }
  refresh() {
    if (this.uniqueid) {
      this.y = this.uniqueid
    } else {
      window.location.reload();

    }

  }



}

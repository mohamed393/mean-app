import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-one-product',
  templateUrl: './one-product.component.html',
  styleUrls: ['./one-product.component.css']
})
export class OneProductComponent implements OnInit {
  product = null;
  isNotValid = false;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let postid = params.get('id');
      this.productService.getOneProduct(postid).subscribe(responseData => {
        if (responseData) {
          this.product = responseData
        } else {
          this.isNotValid = true
        }
      }, error => {
        console.log(error.message)
      })
    })
  }


}

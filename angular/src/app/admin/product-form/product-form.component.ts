import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private productService: ProductService, private router: Router) { }
  ngOnInit() {
    this.categoryService.getCategory().subscribe(responseData => {
      this.categories = responseData as any
    })
  }

  categories: any[] = [];
  isnotvalid = false;
  product: any[] = [];
  save(product) {
    this.productService.createProductValid(product, isvalid => {
      if (isvalid) {
        this.router.navigate(['/admin/products'])
        return true

      } else {
        this.isnotvalid = true;
      }
    })


  }
}

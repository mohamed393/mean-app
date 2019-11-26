import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService,
    private catService: CategoryService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let op1 = this.productService.getAllproducts()
    let op2 = this.catService.getAllcategories()
    let op3 = combineLatest([op1, op2])
    op3.subscribe(data => {
      this.products = data[0] as any
      this.categories = data[1] as any
      /*Here when filtering all products don't appear because we don't know 
      which observable will run first so we want to sure that products 
      already appeared by making subcribe observable of params 
      appeared after products observable*/
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('cateory')
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      })

    })

  }

  category: string;
  products: any[] = []
  filteredProducts: any[] = []
  categories = [];



}

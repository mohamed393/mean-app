import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs'
import { NgxSpinnerService } from "ngx-spinner";
import { delay } from 'rxjs/operators';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService, private spinner: NgxSpinnerService,
    private catService: CategoryService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.spinner.show();


    let op1 = this.productService.getAllproducts()
    let op2 = this.catService.getAllcategories()
    let op3 = this.productService.getThreeProduct()
    let op4 = combineLatest([op1, op2, op3])
    op4.pipe(delay(3000)).subscribe(data => {
      this.products = data[0] as any
      this.categories = data[1] as any
      this.threeProducts = data[2] as any
      /*Here when filtering all products don't appear because we don't know 
      which observable will run first so we want to sure that products 
      already appeared by making subcribe observable of params 
      appeared after products observable*/
      //filter//
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category.nameofcat === this.category) :
          this.threeProducts;
      })

    }, err => console.log(err.message), () => this.spinner.hide())

  }
  //search if query true filteredProducts=search else filteredProducts=threeproducts- //
  onkeyup(query) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.threeProducts

  }
  category: string;
  products: any[] = []
  filteredProducts: any[] = []
  categories = [];
  threeProducts: any[] = []

}

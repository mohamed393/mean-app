import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs'


@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {

  constructor(private catService: CategoryService,
    private productService: ProductService, private router: Router, private route: ActivatedRoute) { }
  //we use combineLatest here because we talk to 2 services at the same time //
  ngOnInit() {
    let op1 = this.catService.getAllcategories()
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      let op2 = this.productService.getoneProduct(this.id)
      let op3 = combineLatest([op1, op2])
      op3.subscribe(data => {
        this.categories = data[0] as any;
        this.product = data[1]
      })

    }
    this.catService.getAllcategories().subscribe(data => {
      this.categories = data as any
    })

  }
  id
  categories = []
  notvalid = false;
  product = {}
  add
  save(value) {
    if (this.id) {
      this.productService.updateProduct(this.id, value).subscribe(data => {
        console.log(data)
      })

    } else {
      this.productService.createnewproduct(value, (isvalid) => {
        if (isvalid) {
          return true
        } else {
          this.notvalid = true
        }
      })
    }
    this.add = true

    //this.router.navigate(['/admin/manage']) //

  }
}

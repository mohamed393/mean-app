import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
    private authService: AuthService) { }

  ngOnInit() {
    this.categoryService.getAllcategories().subscribe(responseData => {
      this.categories = responseData as any
    })
  }
  categories: any[] = []
  error: any = null;
  onSubmit(value) {
    this.categoryService.createnewCategory(value).subscribe(responseData => {
      this.categories.unshift(responseData)
    }, error => {
      this.error = error.message
    })
  }

}

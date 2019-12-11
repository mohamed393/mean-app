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
    this.userid = this.authService.currentUser()._id;
    console.log(this.userid);
    this.categoryService.getAllcategories().subscribe(responseData => {
      this.categories = responseData as any
    })
  }
  categories: any[] = []
  error: any = null;
  userid: any = null;
  onSubmit(value) {
    console.log(value);
    this.categoryService.createnewCategory(value).subscribe(responseData => {
      this.categories.unshift(responseData)
      console.log(responseData)
    }, error => {
      this.error = error.message
    })
  }

}

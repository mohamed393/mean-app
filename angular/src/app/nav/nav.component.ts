import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  items = []
  ngOnInit() {
    let cart = of(localStorage.getItem('cart'));

    if (localStorage.getItem('cart')) {
      cart.pipe(
        take(2000)
      )
        .subscribe((itemss) => {
          this.items = itemss.split(",");

        })

    }

    /*  let x = localStorage.getItem('cart');
      this.items = x.split(","); convert string to array*/


  }

  collapsed = true;
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.router.navigate(['/'])
  }

}

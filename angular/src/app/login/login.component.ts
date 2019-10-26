import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  isNotValid = false;

  onSignIn(loginData) {
    const returnUrl = this.activatedRoute.snapshot.queryParamMap.get("returnUrl");

    this.authService.isValidSignin(loginData, (isValid) => {
      if (isValid) {

        this.router.navigate([returnUrl || '/'])
        return true
      } else {
        this.isNotValid = true
      }

    })
  }

}

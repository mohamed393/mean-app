import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CustomValidators } from '../common/custom-validators'
import { AuthService } from '../services/auth.service';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router
    ,private activatedRoute:ActivatedRoute) { }
  ngOnInit() {
  }

  form = new FormGroup({
    'email': new FormControl('', [Validators.required, CustomValidators.space])
    , 'password': new FormControl('', [Validators.required, Validators.maxLength(15)])
  })
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  isnotvalid = false;
  onsubmit(loginData) {
    // we make this for user who works on url //
    const returnurl = this.activatedRoute.snapshot.queryParamMap.get("returnurl");
    this.authService.isvalidSign(loginData, (isvalid) => {
      if (isvalid) {
        this.router.navigate([returnurl || '/'])
        return true
      } else {
        this.isnotvalid = true
      }
    });


  }


}

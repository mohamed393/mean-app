import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-newaccount',
  templateUrl: './newaccount.component.html',
  styleUrls: ['./newaccount.component.css']
})
export class NewaccountComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  showpreloader: boolean
  isnotvalid = false;
  onsubmit(value) {
    this.showpreloader = true
    setTimeout(() => {
      this.userService.createNewUser(value, isvalid => {
        if (isvalid) {
          this.router.navigate(['/'])
          return true
        } else {
          this.isnotvalid = true
          this.showpreloader = false

        }
      })

    }, 3000);
  }
}

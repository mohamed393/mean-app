import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{
  constructor(private authService: AuthService,private router: Router) { }

  canActivate(route , state:RouterStateSnapshot){
    if(this.authService.isLoggedin()){
      return true
    }else{
       this.router.navigate(['/login'],{queryParams:{returnurl:state.url}})
       return false
    }
  }

}

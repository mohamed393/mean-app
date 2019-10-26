import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route, state) {
    if (this.authService.currentUser().isAdmin) {
      return true;
    } else {
      this.router.navigate(['/noaccess'])
      return false;
    }
  }





}

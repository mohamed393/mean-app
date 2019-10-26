import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false
    }

  };

}

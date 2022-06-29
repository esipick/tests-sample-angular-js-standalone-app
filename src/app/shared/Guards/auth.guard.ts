import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (this.jwtAuth.isLoggedIn()) {
    //   return true;
    // } else {
    //   this.router.navigate(["/"], {
    //     queryParams: {
    //       return: state.url
    //     }
    //   });
      return false;
    // }
  }
}

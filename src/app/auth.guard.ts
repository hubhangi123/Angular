import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core'; // Import 'Injectable' decorator
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) // Add the 'Injectable' decorator
export class Authguard implements CanActivate {
  constructor(private sellerService: SellerService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem('seller')) {
      return Promise.resolve(true);
    }
    return this.sellerService.isSellerLoggedIn;
  }
}

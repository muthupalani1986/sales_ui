import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { SESSION_STORAGE } from '../constnats/session-storage.constant';
import { UserDetails } from '../interfaces/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
  constructor(private _sessionStorageService: SessionStorageService,
  private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails = <UserDetails>this._sessionStorageService.getItem(SESSION_STORAGE.currentUser);
    if (!userDetails) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

}

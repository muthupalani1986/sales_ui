import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { UserDetails } from '../interfaces/user-details.interface';
import { SESSION_STORAGE } from '../constnats/session-storage.constant';

@Injectable({
  providedIn: 'root'
})
export class PickupService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,
    private _sessionStorageService: SessionStorageService) { }
  public savePickup(payload) {
    return this.http.post(this.baseUrl + '/pickup/new', payload, this.requestheader());
  }
  private requestheader(authorization: boolean = true) {
    let authHttpHeader;
    if (!authorization) {
      authHttpHeader = {
        'Content-Type': 'application/json'
      };
    } else {
      const userDetails = <UserDetails>this._sessionStorageService.getItem(SESSION_STORAGE.currentUser);
      const tokenId = userDetails.token;
      authHttpHeader = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenId
      };
    }
    const httpOptions = {
      headers: new HttpHeaders(authHttpHeader)
    };
    return httpOptions;
  }
}

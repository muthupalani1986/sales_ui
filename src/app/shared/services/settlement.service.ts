import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { SessionStorageService } from './../../shared/services/session-storage.service';
import { SESSION_STORAGE } from './../../shared/constnats/session-storage.constant';
import { UserDetails } from './../../shared/interfaces/user-details.interface';

@Injectable({
  providedIn: 'root'
})
export class SettlementService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,
    private _sessionStorageService: SessionStorageService) { }
  saveSettlement(payload) {
    return this.http.post(this.baseUrl + '/payment/new', payload, this.requestheader());
  }
  getSettlementReport(payload) {
    return this.http.post(this.baseUrl + '/api/settlement/report', payload, this.requestheader());
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

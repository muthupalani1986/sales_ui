import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from './config.contant';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class SettlementService {
  private endPoint = AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) { }
  saveSettlement(payload) {
    return this.http.post(this.endPoint + '/api/settlement/save', payload, httpOptions);
  }
  getSettlementReport(payload) {
    return this.http.post(this.endPoint + '/api/settlement/report', payload, httpOptions);
  }
}

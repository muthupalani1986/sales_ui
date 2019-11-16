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
export class QueryService {
  private endPoint=AppSettings.API_ENDPOINT;
  constructor(private http: HttpClient) { }
  public getAllQuery(){
    return this.http.post(this.endPoint+'/api/query/all', '', httpOptions);
  }
  deleteQuery(payload) {
    return this.http.post(this.endPoint+'/api/query/delete', payload, httpOptions);
  }
  saveQuery(payload) {
    return this.http.post(this.endPoint+'/api/query/save', payload, httpOptions);
  }
  updateQuery(payload) {
    return this.http.post(this.endPoint+'/api/query/update', payload, httpOptions);
  }
}
